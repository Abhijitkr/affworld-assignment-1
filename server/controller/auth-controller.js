const User = require("../model/User");
const bcrypt = require("bcrypt");

// Registration Logic
const register = async (req, res) => {
  const { username, email, password, createdDate } = req.body;
  const currentDate = new Date();

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ msg: "User already exists" });
  }

  // //hashing password using bcrypt
  // const saltRound = 10; or const saltRound = await bcrypt.genSalt(10);
  // const hash_password = await bcrypt.hash(password, saltRound);

  const newUser = await User.create({
    username,
    email,
    password,
    createdDate: currentDate,
  });

  const token = await newUser.generateToken();

  try {
    console.log(newUser);
    res
      .status(201)
      .json({
        msg: "Registration successful",
        newUser,
        token,
        userId: newUser._id.toString(),
      });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { register };
