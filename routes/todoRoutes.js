const express = require("express");
const {
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  addTodo,
} = require("../controllers/todosController");
const todoRouter = express.Router();

todoRouter.route("/").get(getTodos);
todoRouter.route("/").post(addTodo);
todoRouter.route("/:id").get(getTodo);
todoRouter.route("/:id").patch(updateTodo);
todoRouter.route("/:id").delete(deleteTodo);

module.exports = todoRouter;
