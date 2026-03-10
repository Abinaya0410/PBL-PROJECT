const LessonProgress = require("../models/LessonProgress");

// =======================
// MARK LESSON COMPLETED
// =======================
const completeLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const studentId = req.user.id;

    const progress = await LessonProgress.findOneAndUpdate(
      { student: studentId, lesson: lessonId },
      {
        completed: true,
        completedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json({
      message: "Lesson marked as completed",
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET LESSON PROGRESS
// =======================
const getLessonProgress = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const studentId = req.user.id;

    const progress = await LessonProgress.findOne({
      student: studentId,
      lesson: lessonId,
    });

    res.json({
      completed: progress ? progress.completed : false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  completeLesson,
  getLessonProgress,
};
