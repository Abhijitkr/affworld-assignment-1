const express = require("express");
const authRouter = express();

const { register } = require("../controller/auth-controller");

authRouter.post("/register", register);

module.exports = authRouter;
