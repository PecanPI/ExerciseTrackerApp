require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const HttpError = require("./models/http-error")

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  // console.log(res);
  next();
});

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// error handling
app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
  });

// Exercise and User Routes
//Connect to mongose and start listening on the port once connected
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b5vo8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}, Connected to Database`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
