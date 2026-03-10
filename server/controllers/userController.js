const User = require("../models/User");

exports.completeProfile = async (req, res) => {
  try {
    const { email } = req.body;

    await User.findOneAndUpdate(
      { email },
      {
        ...req.body,
        profileCompleted: true,
      }
    );

    res.json({ message: "Profile saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
