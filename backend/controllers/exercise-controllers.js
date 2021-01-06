const HttpError = require("../models/http-error");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const User = require("../models/user-model");
const Exercise = require("../models/exercise-model");

async function getExerciseById(req,res,next){
  const exerciseId = req.params.eid
  let exercise
  try{
    exercise = await Exercise.findById(exerciseId)
  } catch (err){
    return next(
      new HttpError('Something went wrong could not find exercise', 500)
    )
  }
  if(!exercise){
    return next (
      new HttpError('Could not find exercise with provided id', 404)
    )
  }
  res.json({exercise: exercise.toObject({getters: true})})
}


//Searching for exercise for specfic user
async function getExerciseByUserId(req, res, next) {
  const userId = req.params.uid;
  let userWithExercise;
  try {
    userWithExercise = await User.findById(userId).populate("exercises");
  } catch (err) {
    return next(
      new HttpError("Could not connect to db, please try again later.", 500)
    );
  }
//|| userWithExercise.exercises.length === 0
  if (!userWithExercise ) {
    return next(new HttpError("Could not find exercises for user", 404));
  }
  res.json({
    exercises: userWithExercise.exercises.map((exercise) =>
      exercise.toObject({ getters: true })
    ),
  });
}

//Creating Exercise, every exercise must be assigned to a user
async function createExercise(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty > 0) {
    return next(
      new HttpError("invalid inputs passed, please check your data" + errors.error, 422)
    );
  }
  
  const {
    title,
    bodyLocation,
    reps,
    sets,
    weight,
    date,
    userId,
  } = req.body;

  const newExercise = new Exercise({
    title,
    bodyLocation,
    reps,
    sets,
    weight,
    date,
    //userId: req.userData.userId,
    userId,
  });

  //make sure user exists to add
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(
      new HttpError(
        "Error occured creating exercise, please try again" + err,
        422
      )
    );
  }
  //if no user throw error
  if (!user) {
    return next(new HttpError("User not found", 404));
  }
  //save exercise to DB
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newExercise.save({ sessions: sess });
    user.exercises.push(newExercise);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Saving exercise failed, please try again", 500));
  }

  res.status(201).json({ exercise: newExercise });
}

async function updateExercise(req, res, next) {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.errors.length > 0) {
    return next(
      new HttpError("invalid inputs passed, please check your data", 422)
    );
  }
  const {
    title,
    bodyLocation,
    reps,
    sets,
    weight,
    date,
    userId
  } = req.body;
  
  //find existing exercise
  const exerciseId = req.params.eid;
  let exercise;
  try {
    exercise = await Exercise.findById(exerciseId);
  } catch (error) {
    return next(new HttpError("Something went wrong could not update", 500));
  }
  if (exercise.userId.toString() !== userId) {
    return next(new HttpError("You are not allowed to edit this", 401));
  }
  
  exercise.title = title;
  exercise.bodyLocation = bodyLocation;
  exercise.reps = reps;
  exercise.sets = sets;
  exercise.weight =weight;
  exercise.date= date;

  try {
    exercise.save();
  } catch (err) {
    return next(new HttpError("Something went wrong could not update", 500));
  }
  res.status(200).json({ exercise: exercise.toObject({ getters: true }) });
}

async function deleteExercise(req, res, next) {
  const exerciseId = req.params.eid;
  let exercise;
  try {
    exercise = await Exercise.findById(exerciseId).populate("userId");
  } catch (err) {
    return next(
      new HttpError("Something went wrong could not delete\n" + err, 500)
    );
  }

  if (!exercise) {
    return next(new HttpError("Could not find Exercise", 404));
  }
  if (exercise.userId.id !== req.params.uid) {
    return next(
      new HttpError("You are not allowed to delete this exercise", 401)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await exercise.remove({ session: sess });
    exercise.userId.exercises.pull(exercise);

    await exercise.userId.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Something went wrong could not delete\n" + err, 500)
    );
  }
  res.json({ message: "exercise deleted" });
}

module.exports = {
  deleteExercise,
  updateExercise,
  createExercise,
  getExerciseByUserId,
  getExerciseById
};
