

const express = require("express");
const router = express.Router();

const {
  createAssignment,
  getCourseAssignments,
  submitAssignment,
  getSubmissions,
  gradeSubmission,
  checkQuizUnlock,
  deleteAssignment,
  getAssignment,
  updateAssignment
} = require("../controllers/assignmentController");

const authMiddleware = require("../middleware/authMiddleware");
const { isTeacher, isStudent } = require("../middleware/roleMiddleware");

const upload = require("../middleware/uploadMiddleware");

// Teacher uploads assignment
router.post(
  "/",
  authMiddleware,
  isTeacher,
  upload.single("pdf"),
  createAssignment
);

// Get assignments for course
router.get(
  "/course/:courseId",
  authMiddleware,
  getCourseAssignments
);

// Student submits assignment
router.post(
  "/submit",
  authMiddleware,
  isStudent,
  upload.single("pdf"),
  submitAssignment
);

// Teacher views submissions
router.get(
  "/submissions/:assignmentId",
  authMiddleware,
  isTeacher,
  getSubmissions
);

// Teacher grades submission
router.put(
  "/grade/:submissionId",
  authMiddleware,
  isTeacher,
  gradeSubmission
);

// Student checks quiz unlock
router.get(
  "/check/:courseId",
  authMiddleware,
  isStudent,
  checkQuizUnlock
);
// DELETE ASSIGNMENT
router.delete(
  "/:assignmentId",
  authMiddleware,
  isTeacher,
  deleteAssignment
);

// GET SINGLE ASSIGNMENT
router.get(
  "/:id",
  authMiddleware,
  isTeacher,
  getAssignment
);

// UPDATE ASSIGNMENT
// router.put(
//   "/:id",
//   authMiddleware,
//   isTeacher,
//   updateAssignment
// );

router.put(
  "/:id",
  authMiddleware,
  isTeacher,
  upload.single("pdf"),
  updateAssignment
);
module.exports = router;