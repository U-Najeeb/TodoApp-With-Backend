const express = require("express");

const { signup, login, logout } = require("../controllers/authController");

const userRouter = express.Router();

userRouter.post("/signup",signup) 
userRouter.route("/login").post(login)
userRouter.route("/logout").delete(logout)

module.exports = userRouter