const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    title: {type: String, required: true},
    description: {type: String},
    reps: {type: Number},
    sets: {type: Number},
    duration: { type: Number},
    date: {type: Date, required: true},
},{
    timestamps: true
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = {Exercise, exerciseSchema};