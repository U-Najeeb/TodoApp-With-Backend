const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config;
dotenv({ path: "./config.env" });
const connectToMongo = require("./config/connectToDb");
const todoRouter = require("./routes/todoRoutes");
const app = express();
connectToMongo();


app.use(express.json());
app.use(express.static('public'));

app.use("/api/v1/todos", todoRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
