
const Course = require("../models/Course");

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
// GET ALL COURSES (Student)
// =======================
// const getAllCourses = async (req, res) => {
//   try {
//     const courses = await Course.find().populate("teacher", "name email");
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// =======================
// GET ALL COURSES (Student - exclude enrolled)
// =======================
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      enrolledStudents: { $ne: req.user.id },
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
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.enrolledStudents.includes(req.user.id)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    course.enrolledStudents.push(req.user.id);
    await course.save();

    res.json({ message: "Enrolled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// TEACHER VIEW OWN COURSES
// =======================
const getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user.id });
    res.json(courses);
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

    // Ownership check
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

    // Ownership check
    if (course.teacher.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await course.deleteOne();

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =======================
// GET STUDENT ENROLLED COURSES
// =======================
const getEnrolledCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      enrolledStudents: req.user.id,
    }).populate("teacher", "name email");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// module.exports = {
//   createCourse,
//   getAllCourses,
//   enrollCourse,
//   getTeacherCourses,
//   updateCourse,
//   deleteCourse,
// };


module.exports = {
  createCourse,
  getAllCourses,
  enrollCourse,
  getTeacherCourses,
  getEnrolledCourses,
  updateCourse,
  deleteCourse,
};

