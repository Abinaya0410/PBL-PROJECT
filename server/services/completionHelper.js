const Lesson = require("../models/Lesson");
const LessonProgress = require("../models/LessonProgress");
const AssignmentSubmission = require("../models/AssignmentSubmission");
const QuizAttempt = require("../models/QuizAttempt");
const CourseProgress = require("../models/CourseProgress");

/**
 * Dynamically evaluates whether a student has completed a course.
 * Strict conditions: All lessons done AND assignment graded AND quiz attempted.
 */
async function evaluateCourseCompletion(studentId, courseId) {
  try {
    // 1. Total lessons in course
    const totalLessons = await Lesson.countDocuments({ course: courseId });

    // 2. Lessons completed by student for this course
    // Note: We filter by lesson list since LessonProgress might not have courseId directly in some versions,
    // although the user's snippet assumes it's there. Let's check the model first.
    const lessonIds = await Lesson.find({ course: courseId }).distinct("_id");
    const completedLessons = await LessonProgress.countDocuments({
      student: studentId,
      lesson: { $in: lessonIds },
      completed: true
    });

    // 3. Assignment status (must be graded)
    const assignmentSubmission = await AssignmentSubmission.findOne({
      student: studentId,
      course: courseId, // Assumes AssignmentSubmission has courseId
      status: "graded"
    });

    // 4. Quiz status (must be attempted)
    const quizAttempt = await QuizAttempt.findOne({
      student: studentId,
      course: courseId
    });

    const isCompleted = 
      totalLessons > 0 && 
      completedLessons === totalLessons && 
      assignmentSubmission && 
      quizAttempt;

    await CourseProgress.findOneAndUpdate(
      { student: studentId, course: courseId },
      {
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : null
      },
      { upsert: true, new: true }
    );

    console.log(`Course ${courseId} completion for user ${studentId}: ${isCompleted}`);
    return isCompleted;

  } catch (error) {
    console.error("Error in evaluateCourseCompletion:", error);
  }
}

module.exports = { evaluateCourseCompletion };
