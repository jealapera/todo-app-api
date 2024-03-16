const Todo = require("./models/todoModel");

const createTodo = async (req, res) => {
  const { text } = req.body;
  const { userId } = req.user;

  const todo = new Todo({
    text,
    user_id: userId,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTodos = async (req, res) => {
  const { userId } = req.user;

  try {
    const todos = await Todo.find({
      user_id: userId,
      status: { $ne: "deleted" },
      deleted: false,
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodoById = async (req, res) => {
  const { userId } = req.user;

  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user_id: userId,
      status: { $ne: "deleted" },
      deleted: false,
    });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  const { userId } = req.user;

  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user_id: userId,
      status: { $ne: "deleted" },
      deleted: false,
    });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (req.body.text != null) {
      todo.text = req.body.text;
    }
    if (req.body.status != null) {
      todo.status = req.body.status;
    }
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { userId } = req.user;

  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user_id: userId,
      status: { $ne: "deleted" },
      deleted: false,
    });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    todo.status = "deleted";
    todo.deleted = true;
    await todo.save();
    res.status(200).json({
      _id: todo._id,
      deleted: todo.deleted,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Complete multiple todos
const completeMultiTodos = async (req, res) => {
  const { todoIds } = req.body;
  const { userId } = req.user;

  try {
    // Update status of all todos with the provided _ids and belonging to the user
    await Todo.updateMany(
      {
        _id: { $in: todoIds },
        user_id: userId,
        status: { $ne: "completed" }, // Update only if status is not yet completed
        deleted: false,
      },
      { status: "completed" }
    );

    res.status(200).json({ message: "Todos updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete multiple todos
const deleteMultiTodos = async (req, res) => {
  const { todoIds } = req.body;
  const { userId } = req.user;

  try {
    // Update status of all todos with the provided _ids and belonging to the user
    await Todo.updateMany(
      {
        _id: { $in: todoIds },
        user_id: userId,
        status: { $ne: "deleted" }, // Update only if status is not yet deleted
        deleted: false,
      },
      { status: "deleted", deleted: true }
    );

    res.status(200).json({ message: "Todos deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  completeMultiTodos,
  deleteMultiTodos,
};
