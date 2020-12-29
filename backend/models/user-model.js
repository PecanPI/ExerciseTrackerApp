const mongoose = require('mongoose')

const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')


// User model Schema 
const userSchema =  new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: [8, 'Password Length 8min'],
    },

    exercises: [{type: mongoose.Types.ObjectId, required: true, ref:'Exercise'}]

}, {
    timestamps: true,
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;