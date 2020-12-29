require('dotenv').config()
const express = require('express')
const cors =  require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users')

const app = express()
const port = process.env.PORT || 5000;


app.use(bodyParser.json())
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

  app.use('/exercises', exercisesRouter)
  app.use('/users', usersRouter)

// Landing Page 
app.get('/', (req,res)=>{
    res.send('Hello World')
})

// Exercise and User Routes
//Connect to mongose and start listening on the port once connected
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b5vo8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}, Connected to Database`);
    });
  })
  .catch((err) => {
    console.log(err);
  });