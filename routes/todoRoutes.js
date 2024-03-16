const express = require("express");
const todoRouter = express.Router();
const todosRouter = require("../todoCRUD");

const { authenticateToken } = require("../middlewares/authenticateToken");

// Apply middleware to routes that require authentication
todoRouter.use(authenticateToken);

// Define todo routes
todoRouter.get("/", todosRouter.getAllTodos);
todoRouter.get("/:id", todosRouter.getTodoById);
todoRouter.post("/", todosRouter.createTodo);
todoRouter.put("/:id", todosRouter.updateTodo);
todoRouter.delete("/:id", todosRouter.deleteTodo);
todoRouter.put("/complete", todosRouter.completeMultiTodos);
todoRouter.delete("/delete", todosRouter.deleteMultiTodos);

module.exports = todoRouter;
