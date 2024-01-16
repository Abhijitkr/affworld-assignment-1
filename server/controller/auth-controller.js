const User = require("../model/User");
const bcrypt = require("bcrypt");

// Registration Logic
const register = async (req, res, next) => {
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
    res.status(201).json({
      msg: "Registration successful",
      token,
      userId: newUser._id.toString(),
    });
  } catch (error) {
    // res.status(500).json({ msg: "Internal server error" });
    next(error);
  }
};

// Login Logic
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // const isUserValid = await bcrypt.compare(password, userExists.password);

    const isUserValid = await userExists.comparePassword(password);

    const token = await userExists.generateToken();

    if (isUserValid) {
      res.status(200).json({
        msg: "Login successful",
        token,
        userId: userExists._id.toString(),
      });
    } else {
      res.status(400).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    // res.status(500).json({ msg: "Internal server error" });'
    next(error);
  }
};

// Send User Login
const user = async (req, res) => {
  try {
    const userData = req.user;
    res.status(200).json({ userData });
  } catch (error) {
    console.log(`User Error: ${error}`);
  }
};

module.exports = { register, login, user };
