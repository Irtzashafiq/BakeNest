const user = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      const login = await user.findOne({ email });

      if (!login) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, login.password);
      console.log("Password Match:", isMatch);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      return res.status(200).json({
        message: "Logged In Successfully",
        userId: login._id,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server error, please try again later",
      });
    }
  },
};
