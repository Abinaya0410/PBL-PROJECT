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

exports.getUserPoints = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const points = user.points || 0;
    let level = "Beginner";
    let nextLevel = "Learner";
    let nextLevelPoints = 200;

    if (points >= 2000) {
      level = "Expert";
      nextLevel = "Max Level";
      nextLevelPoints = points;
    } else if (points >= 1000) {
      level = "Advanced";
      nextLevel = "Expert";
      nextLevelPoints = 2000;
    } else if (points >= 500) {
      level = "Intermediate";
      nextLevel = "Advanced";
      nextLevelPoints = 1000;
    } else if (points >= 200) {
      level = "Learner";
      nextLevel = "Intermediate";
      nextLevelPoints = 500;
    }

    res.json({ points, level, nextLevel, nextLevelPoints });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
