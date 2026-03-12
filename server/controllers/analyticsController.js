

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