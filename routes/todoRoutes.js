const express = require("express");
const {
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  addTodo,
} = require("../controllers/todosController");
const { protect } = require("../controllers/authController");

const todoRouter = express.Router();


todoRouter.route("/").get(protect, getTodos);
todoRouter.route("/").post(protect, addTodo);
todoRouter.route("/:id").get(protect, getTodo);
todoRouter.route("/:id").patch(protect, updateTodo);
todoRouter.route("/:id").delete(protect, deleteTodo);

module.exports = todoRouter;
