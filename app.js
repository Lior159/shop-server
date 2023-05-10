const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://lior:lior159@cluster1.wgsdzck.mongodb.net/shop-mern?retryWrites=true&w=majority";

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080);
    console.log("Connected");
  })
  .catch((err) => console.log(err.message));
