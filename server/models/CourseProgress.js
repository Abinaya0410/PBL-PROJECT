const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseProgress", courseProgressSchema);