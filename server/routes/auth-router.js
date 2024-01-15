const express = require("express");
const authRouter = express();

const { register, login } = require("../controller/auth-controller");
const { signupSchema, loginSchema } = require("../validator/auth-validator");
const validate = require("../middleware/validate-middleware");

authRouter.post("/register", validate(signupSchema), register);
authRouter.post("/login", validate(loginSchema), login);

module.exports = authRouter;
