const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

// =======================
// CREATE LESSON (Teacher)
// =======================
// const createLesson = async (req, res) => {
//   try {
//     const { title, description, contentType, textContent, videoUrl, order } =
//       req.body;
//     const { courseId } = req.params;

//     if (!title || !contentType || order === undefined) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     if (
//       (contentType === "text" && !textContent) ||
//       (contentType === "video" && !videoUrl)
//     ) {
//       return res.status(400).json({ message: "Invalid lesson content" });
//     }

//     const course = await Course.findById(courseId);

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     if (course.teacher.toString() !== req.user.id.toString()) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     const lesson = await Lesson.create({
//       title,
//       description,
//       course: courseId,
//       contentType,
//       textContent,
//       videoUrl,
//       order,
//       createdBy: req.user.id,
//     });

//     res.status(201).json(lesson);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const createLesson = async (req, res) => {
  try {
    const { title, description, textContent, videoUrl, order } = req.body;
    const { courseId } = req.params;

    if (!title || !order) {
      return res.status(400).json({ message: "Title and order are required" });
    }

    if (!textContent && !videoUrl) {
      return res.status(400).json({ message: "Add text or video content" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.teacher.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const pdfUrl = req.file ? `/uploads/${req.file.filename}` : null;
    console.log("Saved PDF:", pdfUrl);

    const lesson = await Lesson.create({
      title,
      description,
      course: courseId,
      textContent,
      videoUrl,
      pdfUrl,
      order,
      createdBy: req.user.id,
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// =======================
// GET LESSONS BY COURSE
// =======================
const getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.find({
      course: req.params.courseId,
    }).sort({ order: 1 });

    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// UPDATE LESSON (Teacher)
// =======================
const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    if (lesson.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(lesson, req.body);
    
    if (req.file) {
      lesson.pdfUrl = `/uploads/${req.file.filename}`;
      console.log("Saved PDF (Update):", lesson.pdfUrl);
    }

    await lesson.save();

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// DELETE LESSON (Teacher)
// =======================
const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    if (lesson.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await lesson.deleteOne();
    res.json({ message: "Lesson deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ COMMONJS EXPORT (CRITICAL)
module.exports = {
  createLesson,
  getLessonsByCourse,
  updateLesson,
  deleteLesson,
};
