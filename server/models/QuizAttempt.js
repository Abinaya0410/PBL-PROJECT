
const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

    score: {
      type: Number,
      default: 0,
    },

    correctCount: {
      type: Number,
      default: 0,
    },

    wrongCount: {
      type: Number,
      default: 0,
    },

    // ✅ NEW: Store detailed answers for review
    answers: [
      {
        question: String,
        options: [String],
        selectedAnswer: String,
        correctAnswer: String,
        isCorrect: Boolean,
      },
    ],

    startTime: {
      type: Date,
    },

    endTime: {
      type: Date,
    },

    timeSpent: {
      type: Number, // in seconds
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);



// const mongoose = require("mongoose");

// const quizAttemptSchema = new mongoose.Schema(
//   {
//     student: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     lesson: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Lesson",
//     },

//     course: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//     },

//     // ✅ NEW: Store course title so analytics still works even if course is deleted
//     courseTitle: {
//       type: String,
//     },

//     score: {
//       type: Number,
//       default: 0,
//     },

//     correctCount: {
//       type: Number,
//       default: 0,
//     },

//     wrongCount: {
//       type: Number,
//       default: 0,
//     },

//     // ✅ Store detailed answers for review
//     answers: [
//       {
//         question: String,
//         options: [String],
//         selectedAnswer: String,
//         correctAnswer: String,
//         isCorrect: Boolean,
//       },
//     ],

//     startTime: {
//       type: Date,
//     },

//     endTime: {
//       type: Date,
//     },

//     timeSpent: {
//       type: Number, // in seconds
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);