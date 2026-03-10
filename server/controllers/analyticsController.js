

// const QuizAttempt = require("../models/QuizAttempt");
// const CourseProgress = require("../models/CourseProgress");
// const mongoose = require("mongoose");

// // ======================================================
// // 🟢 STUDENT ANALYTICS DASHBOARD
// // ======================================================
// exports.getStudentAnalytics = async (req, res) => {
//   try {
//     const studentId = new mongoose.Types.ObjectId(req.user.id);

//     // ======================================================
//     // 1️⃣ GET ENROLLED COURSES WITH NAMES
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
//     // 2️⃣ GET ALL QUIZ ATTEMPTS WITH COURSE NAME
//     // ======================================================
//     const attempts = await QuizAttempt.find({
//       student: studentId,
//     }).populate("course");

//     const totalAttempts = attempts.length;

//     let averageScore = 0;
//     let passCount = 0;
//     let failCount = 0;

//     if (attempts.length > 0) {
//       const totalScore = attempts.reduce(
//         (sum, attempt) => sum + attempt.score,
//         0
//       );

//       averageScore = Math.round(totalScore / attempts.length);

//       attempts.forEach((attempt) => {
//         if (attempt.score >= 60) passCount++;
//         else failCount++;
//       });
//     }

//     // ======================================================
//     // 3️⃣ GROUP ATTEMPTS BY COURSE (COURSE PERFORMANCE)
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
//         };
//       }

//       courseMap[courseId].attempts += 1;
//       courseMap[courseId].totalScore += attempt.score;

//       if (attempt.score > courseMap[courseId].bestScore) {
//         courseMap[courseId].bestScore = attempt.score;
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
//         status:
//           progress && progress.completed
//             ? "Completed"
//             : "In Progress",
//       };
//     });

//     // ======================================================
//     // 4️⃣ RECENT ATTEMPTS (LAST 5)
//     // ======================================================
//     const recentAttempts = attempts
//       .sort((a, b) => b.createdAt - a.createdAt)
//       .slice(0, 5);

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
const mongoose = require("mongoose");

// ======================================================
// 🟢 STUDENT ANALYTICS DASHBOARD (POLISHED VERSION)
// ======================================================
exports.getStudentAnalytics = async (req, res) => {
  try {
    const studentId = new mongoose.Types.ObjectId(req.user.id);

    // ======================================================
    // 1️⃣ GET ENROLLED COURSES
    // ======================================================
    const enrolledCourses = await CourseProgress.find({
      student: studentId,
    }).populate("course");

    const totalEnrolled = enrolledCourses.length;

    const completedList = enrolledCourses.filter(
      (c) => c.completed === true
    );

    const completedCourses = completedList.length;

    // ======================================================
    // 2️⃣ GET ALL ATTEMPTS
    // ======================================================
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

    // ======================================================
    // 3️⃣ GROUP BY COURSE
    // ======================================================
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

      // Track latest attempt
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

    // ======================================================
    // 4️⃣ OVERALL AVERAGE = AVERAGE OF BEST SCORES
    // ======================================================
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

    // ======================================================
    // 5️⃣ RECENT ATTEMPTS (LAST 5)
    // ======================================================
    const recentAttempts = attempts
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    // ======================================================
    // FINAL RESPONSE
    // ======================================================
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