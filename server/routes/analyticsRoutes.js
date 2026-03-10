const express = require("express");
const router = express.Router();

const { getStudentAnalytics } = require("../controllers/analyticsController");
const authMiddleware = require("../middleware/authMiddleware");
const { isStudent } = require("../middleware/roleMiddleware");

// 🔐 Student Analytics Route
router.get("/student", authMiddleware, isStudent, getStudentAnalytics);

module.exports = router;