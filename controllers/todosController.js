const Todo = require("../models/todoModel");
const catchAsync = require("../utils/catchAsync");

const getTodos = catchAsync(async (req, res) => {
  const todos = await Todo.find({user : req.user._id});
  res.status(200).json({
    message: "Todos found",
    todos,
  });
});

const getTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    res.status(200).json({
      message: "Todo Found",
      todo,
    });
  } catch (error) {
    res.status(404).send("Todo not found");
  }
};
const addTodo = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title } = req.body;
    const todo = await Todo.create({ title, user: _id });
    res.status(201).json({
      message: "Todo created",
      todo,
    });
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
};
const updateTodo = async (req, res) => {
  const id = req.params.id;
  const tour = await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    message: "Todo updated",
    tour,
  });
};
const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.status(204).send("Todo is deleted");
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getTodos, getTodo, addTodo, updateTodo, deleteTodo };
