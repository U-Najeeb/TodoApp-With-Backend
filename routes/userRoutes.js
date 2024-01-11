const express = require("express");

const { signup, login } = require("../controllers/authController");

const userRouter = express.Router();

userRouter.post("/signup",signup) 
userRouter.route("/login").post(login)

module.exports = userRouter