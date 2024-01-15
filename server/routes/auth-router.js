const express = require("express");
const authRouter = express();

const { register, login } = require("../controller/auth-controller");

authRouter.post("/register", register);
authRouter.post("/login", login);

module.exports = authRouter;
