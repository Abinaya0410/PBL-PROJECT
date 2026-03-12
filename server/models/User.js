// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },
//     role: {
//       type: String,
//       enum: ["student", "teacher","admin"],
//       default: "student",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },

    // ⭐ VERY IMPORTANT
    profileCompleted: {
      type: Boolean,
      default: false,
    },

    // 🎓 STUDENT FIELDS
    collegeName: String,
    degree: String,
    department: String,
    year: String,
    interest: String,

    // 👩‍🏫 TEACHER FIELDS
    institutionName: String,
    designation: String,
    experience: String,
    subjectsTeaching: String,
    qualification: String,

    // 🌍 COMMON FIELDS
    phone: String,
    country: String,
    state: String,
    city: String,
    
    // 🏆 POINTS SYSTEM
    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
