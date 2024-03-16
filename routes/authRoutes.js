const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const { registerValidationRules, loginValidationRules } = require("../validators/authValidator");

authRouter.post("/register", registerValidationRules, authController.register);
authRouter.post("/login", loginValidationRules, authController.login);

module.exports = authRouter;
