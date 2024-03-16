const express = require("express");
const apiRouter = express.Router();
const authRoutes = require("./authRoutes");
const todoRoutes = require("./todoRoutes");

// Define routes
apiRouter.use("/auth", authRoutes);
apiRouter.use("/todos", todoRoutes);

module.exports = function (expressApp) {
  expressApp.use("/api", apiRouter);
};
