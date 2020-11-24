const express = require('express')
const cors =  require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()


const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

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

app.get('/', (req,res)=>{
    res.send('Hello World')
})

app.listen(port, ()=>{
    console.log(`Server is runnong on port: ${port}`);
})