
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { isStudent, isTeacher } = require("../middleware/roleMiddleware");
const { getEnrolledCourses, getAnnouncements } = require("../controllers/courseController");



const {
  createCourse,
  getAllCourses,
  enrollCourse,
  getTeacherCourses,
  updateCourse,
  deleteCourse,
  getMyAnnouncements,
} = require("../controllers/courseController");

// =======================
// Teacher creates course
// =======================
router.post("/", authMiddleware, isTeacher, createCourse);

// =======================
// Student views all courses
// =======================
router.get("/", authMiddleware, isStudent, getAllCourses);

// =======================
// Student enrolls in course
// =======================
router.post("/enroll/:id", authMiddleware, isStudent, enrollCourse);

// =======================
// Teacher views own courses
// =======================
router.get("/teacher", authMiddleware, isTeacher, getTeacherCourses);

// =======================
// Teacher edits own course
// =======================
router.put("/:id", authMiddleware, isTeacher, updateCourse);

// =======================
// Teacher deletes own course
// =======================
router.get("/:courseId/announcements", authMiddleware, getAnnouncements);
router.delete("/:id", authMiddleware, isTeacher, deleteCourse);

// Student enrolled courses
// =======================
router.get("/my", authMiddleware, isStudent, getEnrolledCourses);
router.get("/completed/:courseId/review", authMiddleware, isStudent, require("../controllers/courseController").getCompletedCourseReview);
router.get("/my-announcements", authMiddleware, isStudent, getMyAnnouncements);

module.exports = router;
