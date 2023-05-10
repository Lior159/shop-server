const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserRouter = require("./routes/auth");
const flash = require("connect-flash");

const MONGODB_URI =
  "mongodb+srv://lior:lior159@cluster1.wgsdzck.mongodb.net/shop-mern?retryWrites=true&w=majority";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Request-Method", "GET, POST");
  next();
});

app.use(flash());

app.use(UserRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(3000);
    console.log("Connected");
  })
  .catch((err) => console.log(err.message));
