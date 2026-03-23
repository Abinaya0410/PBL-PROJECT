

// const QuizAttempt = require("../models/QuizAttempt");
// const CourseProgress = require("../models/CourseProgress");
// const Course = require("../models/Course");
// const Lesson = require("../models/Lesson");
// const mongoose = require("mongoose");

// // ======================================================
// // 🟢 STUDENT ANALYTICS DASHBOARD (POLISHED VERSION)
// // ======================================================
// exports.getStudentAnalytics = async (req, res) => {
//   try {
//     const studentId = new mongoose.Types.ObjectId(req.user.id);

//     // ======================================================
//     // 1️⃣ GET ENROLLED COURSES
//     // ======================================================
//     const enrolledCourses = await CourseProgress.find({
//       student: studentId,
//     }).populate("course");

//     const totalEnrolled = enrolledCourses.length;

//     const completedList = enrolledCourses.filter(
//       (c) => c.completed === true
//     );

//     const completedCourses = completedList.length;

//     // ======================================================
//     // 2️⃣ GET ALL ATTEMPTS
//     // ======================================================
//     const attempts = await QuizAttempt.find({
//       student: studentId,
//     }).populate("course");

//     const totalAttempts = attempts.length;

//     let passCount = 0;
//     let failCount = 0;

//     attempts.forEach((attempt) => {
//       if (attempt.score >= 60) passCount++;
//       else failCount++;
//     });

//     // ======================================================
//     // 3️⃣ GROUP BY COURSE
//     // ======================================================
//     const courseMap = {};

//     attempts.forEach((attempt) => {
//       if (!attempt.course) return;

//       const courseId = attempt.course._id.toString();

//       if (!courseMap[courseId]) {
//         courseMap[courseId] = {
//           courseId,
//           courseTitle: attempt.course.title,
//           attempts: 0,
//           bestScore: 0,
//           totalScore: 0,
//           lastAttemptDate: attempt.createdAt,
//         };
//       }

//       courseMap[courseId].attempts += 1;
//       courseMap[courseId].totalScore += attempt.score;

//       if (attempt.score > courseMap[courseId].bestScore) {
//         courseMap[courseId].bestScore = attempt.score;
//       }

//       // Track latest attempt
//       if (attempt.createdAt > courseMap[courseId].lastAttemptDate) {
//         courseMap[courseId].lastAttemptDate = attempt.createdAt;
//       }
//     });

//     const coursePerformance = Object.values(courseMap).map((course) => {
//       const progress = enrolledCourses.find(
//         (e) =>
//           e.course &&
//           e.course._id.toString() === course.courseId
//       );

//       return {
//         courseId: course.courseId,
//         courseTitle: course.courseTitle,
//         attempts: course.attempts,
//         bestScore: course.bestScore,
//         averageScore: Math.round(
//           course.totalScore / course.attempts
//         ),
//         lastAttemptDate: course.lastAttemptDate,
//         status:
//           progress && progress.completed
//             ? "Completed"
//             : "In Progress",
//       };
//     });

//     // ======================================================
//     // 4️⃣ OVERALL AVERAGE = AVERAGE OF BEST SCORES
//     // ======================================================
//     let averageScore = 0;

//     if (coursePerformance.length > 0) {
//       const totalBestScores = coursePerformance.reduce(
//         (sum, course) => sum + course.bestScore,
//         0
//       );

//       averageScore = Math.round(
//         totalBestScores / coursePerformance.length
//       );
//     }

//     // ======================================================
//     // 5️⃣ RECENT ATTEMPTS (LAST 5)
//     // ======================================================
//     const recentAttempts = attempts
//       .sort((a, b) => b.createdAt - a.createdAt)
//       .slice(0, 5);


//       // ======================================================
// // 🟢 STUDENT ANALYTICS DASHBOARD (POLISHED VERSION)
// // ======================================================
// exports.getStudentAnalytics = async (req, res) => {
//   try {
//     const studentId = new mongoose.Types.ObjectId(req.user.id);

//     const enrolledCourses = await CourseProgress.find({
//       student: studentId,
//     }).populate("course");

//     const totalEnrolled = enrolledCourses.length;

//     const completedList = enrolledCourses.filter(
//       (c) => c.completed === true
//     );

//     const completedCourses = completedList.length;

//     const attempts = await QuizAttempt.find({
//       student: studentId,
//     }).populate("course");

//     const totalAttempts = attempts.length;

//     let passCount = 0;
//     let failCount = 0;

//     attempts.forEach((attempt) => {
//       if (attempt.score >= 60) passCount++;
//       else failCount++;
//     });

//     const courseMap = {};

//     attempts.forEach((attempt) => {
//       if (!attempt.course) return;

//       const courseId = attempt.course._id.toString();

//       if (!courseMap[courseId]) {
//         courseMap[courseId] = {
//           courseId,
//           courseTitle: attempt.course.title,
//           attempts: 0,
//           bestScore: 0,
//           totalScore: 0,
//           lastAttemptDate: attempt.createdAt,
//         };
//       }

//       courseMap[courseId].attempts += 1;
//       courseMap[courseId].totalScore += attempt.score;

//       if (attempt.score > courseMap[courseId].bestScore) {
//         courseMap[courseId].bestScore = attempt.score;
//       }

//       if (attempt.createdAt > courseMap[courseId].lastAttemptDate) {
//         courseMap[courseId].lastAttemptDate = attempt.createdAt;
//       }
//     });

//     const coursePerformance = Object.values(courseMap).map((course) => {
//       const progress = enrolledCourses.find(
//         (e) =>
//           e.course &&
//           e.course._id.toString() === course.courseId
//       );

//       return {
//         courseId: course.courseId,
//         courseTitle: course.courseTitle,
//         attempts: course.attempts,
//         bestScore: course.bestScore,
//         averageScore: Math.round(
//           course.totalScore / course.attempts
//         ),
//         lastAttemptDate: course.lastAttemptDate,
//         status:
//           progress && progress.completed
//             ? "Completed"
//             : "In Progress",
//       };
//     });

//     let averageScore = 0;

//     if (coursePerformance.length > 0) {
//       const totalBestScores = coursePerformance.reduce(
//         (sum, course) => sum + course.bestScore,
//         0
//       );

//       averageScore = Math.round(
//         totalBestScores / coursePerformance.length
//       );
//     }

//     const recentAttempts = attempts
//       .sort((a, b) => b.createdAt - a.createdAt)
//       .slice(0, 5);

//     res.json({
//       totalEnrolled,
//       completedCourses,
//       averageScore,
//       totalAttempts,
//       passCount,
//       failCount,
//       coursePerformance,
//       recentAttempts,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ======================================================
// // 🟣 TEACHER DASHBOARD ANALYTICS (NEW)
// // ======================================================
// exports.getTeacherAnalytics = async (req, res) => {
//   try {
//     const teacherId = new mongoose.Types.ObjectId(req.user.id);

//     // 1️⃣ Get teacher courses
//     const courses = await Course.find({
//       teacher: teacherId,
//     });

//     const totalCourses = courses.length;

//     // 2️⃣ Count total students
//     let totalStudents = 0;

//     courses.forEach((course) => {
//       totalStudents += course.enrolledStudents.length;
//     });

//     const courseIds = courses.map((course) => course._id);

//     // 3️⃣ Count lessons
//     const totalLessons = await Lesson.countDocuments({
//       course: { $in: courseIds },
//     });

//     // 4️⃣ Count quiz attempts
//     const totalAttempts = await QuizAttempt.countDocuments({
//       course: { $in: courseIds },
//     });

//     // 5️⃣ Recent courses
//     const recentCourses = await Course.find({
//       teacher: teacherId,
//     })
//       .sort({ createdAt: -1 })
//       .limit(5);

//     res.json({
//       totalCourses,
//       totalStudents,
//       totalLessons,
//       totalAttempts,
//       recentCourses,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

//     // ======================================================
//     // FINAL RESPONSE
//     // ======================================================
//     res.json({
//       totalEnrolled,
//       completedCourses,
//       averageScore,
//       totalAttempts,
//       passCount,
//       failCount,
//       coursePerformance,
//       recentAttempts,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };


const QuizAttempt = require("../models/QuizAttempt");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const AssignmentSubmission = require("../models/AssignmentSubmission");
const Assignment = require("../models/Assignment");
const User = require("../models/User");
const mongoose = require("mongoose");

// ======================================================
// 🟢 STUDENT ANALYTICS DASHBOARD
// ======================================================
exports.getStudentAnalytics = async (req, res) => {
  try {
    const studentId = new mongoose.Types.ObjectId(req.user.id);

    // 1️⃣ GET ENROLLED COURSES
    const enrolledCourses = await CourseProgress.find({
      student: studentId,
    }).populate("course");

    const totalEnrolled = enrolledCourses.length;

    const completedList = enrolledCourses.filter(
      (c) => c.completed === true
    );

    const completedCourses = completedList.length;

    // 2️⃣ GET QUIZ ATTEMPTS
    const attempts = await QuizAttempt.find({
      student: studentId,
    }).populate("course");

    const totalAttempts = attempts.length;

    let passCount = 0;
    let failCount = 0;

    attempts.forEach((attempt) => {
      if (attempt.score >= 60) passCount++;
      else failCount++;
    });

    // 3️⃣ GROUP PERFORMANCE BY COURSE
    const courseMap = {};

    attempts.forEach((attempt) => {
      if (!attempt.course) return;

      const courseId = attempt.course._id.toString();

      if (!courseMap[courseId]) {
        courseMap[courseId] = {
          courseId,
          courseTitle: attempt.course.title,
          attempts: 0,
          bestScore: 0,
          totalScore: 0,
          lastAttemptDate: attempt.createdAt,
        };
      }

      courseMap[courseId].attempts += 1;
      courseMap[courseId].totalScore += attempt.score;

      if (attempt.score > courseMap[courseId].bestScore) {
        courseMap[courseId].bestScore = attempt.score;
      }

      if (attempt.createdAt > courseMap[courseId].lastAttemptDate) {
        courseMap[courseId].lastAttemptDate = attempt.createdAt;
      }
    });

    const coursePerformance = Object.values(courseMap).map((course) => {
      const progress = enrolledCourses.find(
        (e) =>
          e.course &&
          e.course._id.toString() === course.courseId
      );

      return {
        courseId: course.courseId,
        courseTitle: course.courseTitle,
        attempts: course.attempts,
        bestScore: course.bestScore,
        averageScore: Math.round(
          course.totalScore / course.attempts
        ),
        lastAttemptDate: course.lastAttemptDate,
        status:
          progress && progress.completed
            ? "Completed"
            : "In Progress",
      };
    });

    // 4️⃣ OVERALL AVERAGE SCORE
    let averageScore = 0;

    if (coursePerformance.length > 0) {
      const totalBestScores = coursePerformance.reduce(
        (sum, course) => sum + course.bestScore,
        0
      );

      averageScore = Math.round(
        totalBestScores / coursePerformance.length
      );
    }

    // 5️⃣ RECENT ATTEMPTS
    const recentAttempts = attempts
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    res.json({
      totalEnrolled,
      completedCourses,
      averageScore,
      totalAttempts,
      passCount,
      failCount,
      coursePerformance,
      recentAttempts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ======================================================
// 📊 GET STUDENT DASHBOARD STATS (REAL DATA)
// ======================================================
exports.getStudentDashboardStats = async (req, res) => {
  try {
    const studentId = new mongoose.Types.ObjectId(req.user.id);

    // 1. Courses Done
    const coursesDone = await CourseProgress.countDocuments({
      student: studentId,
      completed: true
    });

    // 2. Total Assignments Submitted
    const assignmentsSubmitted = await AssignmentSubmission.countDocuments({
      student: studentId
    });

    // 3. Average Quiz Score
    const quizAttempts = await QuizAttempt.find({ student: studentId });
    let avgScore = 0;
    if (quizAttempts.length > 0) {
      const totalScore = quizAttempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0);
      avgScore = Math.round(totalScore / quizAttempts.length);
    }

    res.json({
      coursesDone,
      assignmentsSubmitted,
      avgScore
    });
  } catch (err) {
    console.error("STUDENT DASHBOARD STATS ERROR:", err);
    res.status(500).json({ message: "Server error calculating stats" });
  }
};

// ======================================================
// 📊 GET COURSE ANALYTICS (TEACHER)
// ======================================================
exports.getCourseAnalytics = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId || courseId === "undefined" || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID provided" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 1. Total students enrolled
    const totalStudents = course.enrolledStudents.length;

    // 2. Assignments submitted
    const assignments = await Assignment.find({ course: courseId });
    const assignmentIds = assignments.map(a => a._id);
    const totalSubmissions = await AssignmentSubmission.countDocuments({
      assignment: { $in: assignmentIds },
      status: "submitted"
    });

    // 3. Average quiz score & pass rate
    const quizAttempts = await QuizAttempt.find({ course: courseId });
    const totalAttempts = quizAttempts.length;
    let totalScore = 0;
    let passCount = 0;

    quizAttempts.forEach(attempt => {
      totalScore += attempt.score;
      if (attempt.score >= 60) passCount++;
    });

    const averageQuizScore = totalAttempts > 0 ? Math.round(totalScore / totalAttempts) : 0;
    const quizPassRate = totalAttempts > 0 ? Math.round((passCount / totalAttempts) * 100) : 0;

    // 4. Student performance table
    // We need to fetch progress for each student
    const studentPerformance = await Promise.all(course.enrolledStudents.map(async (studentId) => {
      const student = await User.findById(studentId).select("name email");
      if (!student) return null;

      // Lessons progress
      const progress = await CourseProgress.findOne({ student: studentId, course: courseId });
      const completedLessons = progress ? progress.completedLessons.length : 0;
      const totalLessons = await Lesson.countDocuments({ course: courseId });

      // Assignments status
      const studentSubmissions = await AssignmentSubmission.find({
        student: studentId,
        assignment: { $in: assignmentIds }
      });

      // Quiz score
      const studentAttempts = quizAttempts.filter(a => a.student.toString() === studentId.toString());
      const bestScore = studentAttempts.length > 0 ? Math.max(...studentAttempts.map(a => a.score)) : 0;

      // Status logic: Completed / In Progress / Not Attempted
      let status = "Not Attempted";
      if (progress && progress.completed) {
        status = "Completed";
      } else if (studentSubmissions.length > 0 || studentAttempts.length > 0 || (progress && progress.completedLessons.length > 0)) {
        status = "In Progress";
      }

      return {
        student: student.name,
        email: student.email,
        lessons: `${completedLessons}/${totalLessons}`,
        assignments: studentSubmissions.length,
        quizScore: bestScore,
        attempts: studentAttempts.length,
        status
      };
    }));

    res.json({
      totalStudents,
      totalSubmissions,
      averageQuizScore,
      quizPassRate,
      studentPerformance: studentPerformance.filter(s => s !== null)
    });

  } catch (err) {
    console.error("COURSE ANALYTICS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ======================================================
// 🟣 TEACHER DASHBOARD ANALYTICS
// ======================================================
exports.getTeacherAnalytics = async (req, res) => {
  try {
    const teacherId = new mongoose.Types.ObjectId(req.user.id);

    // 1️⃣ GET TEACHER COURSES
    const courses = await Course.find({
      teacher: teacherId,
    });

    const totalCourses = courses.length;

    // 2️⃣ TOTAL STUDENTS
    let totalStudents = 0;

    courses.forEach((course) => {
      totalStudents += course.enrolledStudents.length;
    });

    const courseIds = courses.map((course) => course._id);

    // 3️⃣ TOTAL LESSONS
    const totalLessons = await Lesson.countDocuments({
      course: { $in: courseIds },
    });

    // 4️⃣ TOTAL QUIZ ATTEMPTS
    const totalAttempts = await QuizAttempt.countDocuments({
      course: { $in: courseIds },
    });

    // 5️⃣ RECENT COURSES
    const recentCourses = await Course.find({
      teacher: teacherId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // 6️⃣ RECENT SUBMISSIONS
    const recentSubmissions = await AssignmentSubmission.find({
      assignment: {
        $in: await (
          await mongoose.model("Assignment").find({ course: { $in: courseIds } })
        ).map((a) => a._id),
      },
    })
      .populate("student", "name email")
      .populate({
        path: "assignment",
        populate: { path: "course", select: "title" },
      })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalCourses,
      totalStudents,
      totalLessons,
      totalAttempts,
      recentCourses,
      recentSubmissions,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};