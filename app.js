require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");

const MONGODB_URI = process.env.CONNECTION_STRING;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Request-Method", "GET, POST");
  next();
});

app.use(authRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080);
    console.log("Connected");
  })
  .catch((err) => console.log(err.message));
