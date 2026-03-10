const express = require("express");
const router = express.Router();
const { completeProfile } = require("../controllers/userController");

router.post("/complete-profile", completeProfile);

module.exports = router;
