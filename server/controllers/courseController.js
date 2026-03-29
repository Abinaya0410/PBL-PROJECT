const mongoose = require("mongoose");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const LessonProgress = require("../models/LessonProgress");
const CourseProgress = require("../models/CourseProgress");
const Assignment = require("../models/Assignment");
const AssignmentSubmission = require("../models/AssignmentSubmission");
const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const Announcement = require("../models/Announcement");
const User = require("../models/User");

// =======================
// CREATE COURSE (Teacher)
// =======================
const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      teacher: req.user.id,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET ALL COURSES (Student - exclude enrolled)
// =======================
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      enrolledStudents: { $ne: req.user.id }
    }).populate("teacher", "name email");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// STUDENT ENROLL COURSE
// =======================
const enrollCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const studentId = req.user.id;
    const isAlreadyEnrolled = course.enrolledStudents.some(
      (sId) => sId.toString() === studentId.toString()
    );

    if (isAlreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    course.enrolledStudents.push(studentId);
    await course.save();

    res.json({ message: "Enrolled successfully" });
  } catch (error) {
    console.error("Enrollment Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// =======================
// TEACHER VIEW OWN COURSES
// =======================
const getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({ 
      $or: [
        { teacher: req.user.id },
        { teacher: new mongoose.Types.ObjectId(req.user.id) }
      ]
    }).populate("teacher", "name email");

    console.log(`[DEBUG] Teacher Courses: Found ${courses.length} courses for teacher ${req.user.id}`);

    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const cId = course._id;
        const cIdStr = course._id.toString();
        
        const lessonsCount = await Lesson.countDocuments({ course: { $in: [cId, cIdStr] } });
        const assignmentsCount = await Assignment.countDocuments({ course: { $in: [cId, cIdStr] } });
        const quizzesCount = await Quiz.countDocuments({ course: { $in: [cId, cIdStr] } });
        
        return {
          ...course.toObject(),
          stats: {
            students: course.enrolledStudents.length,
            modules: lessonsCount,
            assignments: assignmentsCount,
            quizzes: quizzesCount
          }
        };
      })
    );

    res.json(coursesWithStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// UPDATE COURSE (Teacher)
// =======================
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.teacher.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    course.title = title || course.title;
    course.description = description || course.description;

    await course.save();

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// DELETE COURSE (Teacher)
// =======================
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.teacher.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 1️⃣ Delete Announcements
    await Announcement.deleteMany({ course: id });

    // 2️⃣ Delete Quiz Attempts
    await QuizAttempt.deleteMany({ course: id });

    // 3️⃣ Delete Quizzes
    await Quiz.deleteMany({ course: id });

    // 4️⃣ Delete Assignment Submissions
    await AssignmentSubmission.deleteMany({ course: id });

    // 5️⃣ Delete Assignments
    await Assignment.deleteMany({ course: id });

    // 6️⃣ Delete Lesson Progress
    const lessons = await Lesson.find({ course: id }).select("_id");
    const lessonIds = lessons.map(l => l._id);
    await LessonProgress.deleteMany({ lesson: { $in: lessonIds } });

    // 7️⃣ Delete Lessons
    await Lesson.deleteMany({ course: id });

    // 8️⃣ Delete Course Progress
    await CourseProgress.deleteMany({ course: id });

    // 9️⃣ Finally, Delete the Course
    await course.deleteOne();

    res.json({ message: "Course and all related data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET STUDENT ENROLLED COURSES
// =======================
const getEnrolledCourses = async (req, res) => {
  try {
    const completedCourseIds = await CourseProgress.find({
      student: req.user.id,
      completed: true
    }).distinct("course");

    const courses = await Course.find({
      enrolledStudents: req.user.id
    }).populate("teacher", "name email");

    const coursesWithProgress = await Promise.all(
      courses.map(async (course) => {
        // 1. Lesson Progress
        const totalLessons = await Lesson.countDocuments({ course: course._id });
        const lessonIds = await Lesson.find({ course: course._id }).distinct("_id");
        const completedLessonsCount = await LessonProgress.countDocuments({
          student: req.user.id,
          completed: true,
          lesson: { $in: lessonIds },
        });

        // 2. Assignment Progress
        const assignment = await Assignment.findOne({ course: course._id });
        let assignmentDone = true; // Default if no assignment exists
        if (assignment) {
          const submission = await AssignmentSubmission.findOne({
            student: req.user.id,
            $or: [
              { course: course._id },
              { assignment: assignment._id } // Fallback for old records
            ],
            status: "graded"
          });
          assignmentDone = !!submission;
        }

        // 3. Quiz Progress
        const quiz = await Quiz.findOne({ course: course._id });
        let quizDone = true; // Default if no quiz exists
        if (quiz) {
          const passAttempt = await QuizAttempt.findOne({
            student: req.user.id,
            $or: [
              { 
                course: course._id,
                $or: [
                  { lesson: { $exists: false }, score: { $gte: 60 } }, // course quiz percentage
                  { lesson: { $exists: true },  score: { $gte: 12 } }  // lesson quiz raw count
                ]
              },
              {
                lesson: { $in: lessonIds },
                score: { $gte: 12 }
              }
            ]
          });
          quizDone = !!passAttempt;
        }

        // 4. Calculate Combined Progress
        const totalUnits = totalLessons + (assignment ? 1 : 0) + (quiz ? 1 : 0);
        const completedUnits = (Math.min(completedLessonsCount, totalLessons)) + 
          (assignment ? (assignmentDone ? 1 : 0) : 0) + 
          (quiz ? (quizDone ? 1 : 0) : 0);

        const progress = totalUnits === 0 ? 0 : Math.round((completedUnits / totalUnits) * 100);

        // 5. Completion Status (from CourseProgress)
        const courseProgress = await CourseProgress.findOne({
          student: req.user.id,
          course: course._id
        });

        // 6. Final Strict Completion Check (Sync with helper logic)
        const isFullyCompleted = 
          (totalLessons === 0 || completedLessonsCount === totalLessons) && 
          assignmentDone && 
          quizDone;

        // 🛡️ AUTO-PERSISTENCE SAFETY NET:
        // If the calculation says 100% complete but database says false, "self-heal" the record now.
        if (isFullyCompleted && (!courseProgress || !courseProgress.completed)) {
          console.log(`[SAFETY NET] Auto-completing course ${course.title} for student ${req.user.id}`);
          await CourseProgress.findOneAndUpdate(
            { student: req.user.id, course: course._id },
            { completed: true, completedAt: new Date() },
            { upsert: true }
          );
        }

        return {
          ...course.toObject(),
          progress,
          quizCompleted: quiz ? quizDone : true,
          isFullyCompleted, 
          completed: isFullyCompleted || (courseProgress ? courseProgress.completed : false)
        };
      })
    );

    res.json(coursesWithProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET STUDENT COMPLETED COURSES
// =======================
const getCompletedCourses = async (req, res) => {
  try {
    const completedCourses = await CourseProgress.find({
      student: req.user.id,
      completed: true
    }).populate({
      path: "course",
      populate: { path: "teacher", select: "name email" }
    });

    res.json(completedCourses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const Announcement = require("../models/Announcement");
    const announcements = await Announcement.find({
      course: req.params.courseId,
    })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyAnnouncements = async (req, res) => {
  try {
    const Announcement = require("../models/Announcement");
    const Course = require("../models/Course");
    
    const enrolledCourses = await Course.find({
      enrolledStudents: req.user.id
    }).distinct("_id");

    const announcements = await Announcement.find({
      course: { $in: enrolledCourses }
    })
      .populate("createdBy", "name")
      .populate("course", "title")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompletedCourseReview = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Fetch Best Quiz Score
    const bestQuizAttempt = await QuizAttempt.findOne({ 
      course: courseId, 
      student: studentId 
    }).sort({ score: -1 });

    // Fetch Best Assignment Score
    const assignment = await Assignment.findOne({ course: courseId });
    let assignmentScore = null;
    if (assignment) {
      const submission = await AssignmentSubmission.findOne({
        assignment: assignment._id,
        student: studentId
      }).sort({ grade: -1 });
      assignmentScore = submission ? submission.grade : null;
    }

    res.json({
      courseTitle: course.title,
      quizScore: bestQuizAttempt ? bestQuizAttempt.score : 0,
      assignmentScore: assignmentScore,
      completionDate: bestQuizAttempt ? bestQuizAttempt.createdAt : new Date(),
      status: "Course Successfully Completed"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  enrollCourse,
  getTeacherCourses,
  getEnrolledCourses,
  getCompletedCourses,
  updateCourse,
  deleteCourse,
  getAnnouncements,
  getMyAnnouncements,
  getCompletedCourseReview
};