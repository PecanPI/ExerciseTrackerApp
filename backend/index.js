const express = require('express')
const cors =  require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
//

require('dotenv').config()


const app = express()
const port = process.env.PORT || 5000;




app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave :false,
    saveUninitialized: false,
    cookie :{secure: true}
}));

app.use(passport.initialize());
app.use(passport.session())



// Connect to Mongoose Database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, 
    {useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB connection established successfully");
})

// Landing Page 
app.get('/', (req,res)=>{
    res.send('Hello World')
})

// Exercise and User Routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users')
app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

app.listen(port, ()=>{
    console.log(`Server is runnong on port: ${port}`);
})