const express = require("express");
const dotenv = require("dotenv").config;
dotenv({ path: "./config.env" });
const connectToMongo = require("./config/connectToDb");
const todoRouter = require("./routes/todoRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const userRouter = require("./routes/userRoutes");
const cookieParser = require('cookie-parser');
const app = express();
connectToMongo();
app.use(cookieParser());


const protectView = (req, res, next) => {
  let token = req.cookies.jwt
  if (!token) {
    return res.sendFile(__dirname + "/views/index.html");
  }
  next()
};


app.use(express.static('public'));

app.get("/todos.html",protectView)
app.use(express.static('views'));


app.use(express.json());

app.get("/" , (req, res, next) => {
  res.sendFile(__dirname + `/views/index.html`)
})

app.use("/api/v1/users", userRouter)
app.use("/api/v1/todos", todoRouter);


app.all("*", (req, res, next) => {

  next(new AppError (`Can't find ${req.originalUrl} on this server`, 404))
})


app.use(globalErrorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
