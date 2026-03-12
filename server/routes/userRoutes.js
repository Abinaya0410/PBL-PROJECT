const express = require("express");
const router = express.Router();
const { completeProfile, getUserPoints } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/complete-profile", completeProfile);
router.get("/points", authMiddleware, getUserPoints);

module.exports = router;
