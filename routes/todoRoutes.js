const express = require("express");
const todoRouter = express.Router();
const todoController = require("../controllers/todoController");
const { authenticateToken } = require("../middlewares/authenticateToken");

// Apply middleware to routes that require authentication
todoRouter.use(authenticateToken);

// Define routes
todoRouter.get("/", todoController.getAllTodos);
todoRouter.get("/:id", todoController.getTodoById);
todoRouter.post("/", todoController.createTodo);
todoRouter.put("/:id", todoController.updateTodo);
todoRouter.delete("/:id", todoController.deleteTodo);
todoRouter.put("/complete", todoController.completeMultiTodos);
todoRouter.delete("/delete", todoController.deleteMultiTodos);

module.exports = todoRouter;
