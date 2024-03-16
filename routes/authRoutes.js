const express = require("express");
const authController = require("../controllers/authController");
const { registerValidationRules, loginValidationRules } = require("../validators/authValidator");

const authRouter = express.Router();

authRouter.post("/register", registerValidationRules, authController.register);
authRouter.post("/login", loginValidationRules, authController.login);

module.exports = authRouter;
