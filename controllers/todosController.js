const Todo = require("../models/todoModel");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      message: "Todos found",
      todos,
    });
  } catch (error) {
    res.status(400).send("Todos Not Found");
  }
};
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
    const body = req.body;
    const todo = await Todo.create(body);
    res.status(201).json({
      message: "Todo created",
      todo,
    });
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
};
const updateTodo = async (req, res) => {
    const id = req.params.id
    const tour = await Todo.findByIdAndUpdate(id , req.body, {
        new : true,
        runValidators: true
    })
    res.status(200).json({
        message : "Todo updated",
        tour
    })

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
