const User = require("../model/User");

// Registration Logic
const register = async (req, res) => {
  const { username, email, password, createdDate } = req.body;
  const currentDate = new Date();

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const newUser = await User.create({
    username,
    email,
    password,
    createdDate: currentDate,
  });

  try {
    console.log(req.body);
    res.status(200).json({ newUser });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { register };
