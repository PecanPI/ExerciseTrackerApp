const HttpError = require("../models/http-error");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const User = require("../models/user-model");
const Exercise = require("../models/exercise-model");

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

  if (!userWithExercise || userWithExercise.exercises.length === 0) {
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
  // const errors = validationResult(req);

  // if (errors.errors.length > 0) {
  //   return next(
  //     new HttpError("invalid inputs passed, please check your data", 422)
  //   );
  // }
  console.log(req.body);

  const {
    title,
    description,
    bodyLocation,
    reps,
    sets,
    weight,
    duration,
    date,
    userId,
  } = req.body;

  const newExercise = new Exercise({
    title,
    description,
    bodyLocation,
    reps,
    sets,
    weight,
    duration,
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

  if (errors.errors.length > 0) {
    return next(
      new HttpError("invalid inputs passed, please check your data", 422)
    );
  }

  const {
    title,
    description,
    bodyLocation,
    reps,
    sets,
    weight,
    duration,
    date,
  } = req.body;

  const updatedExercise = new Exercise({
    title,
    description,
    bodyLocation,
    reps,
    sets,
    weight,
    duration,
    date,
    userId: req.params.uid,
  });
  //find existing exercise
  const exerciseId = req.params.eid;
  let exercise;
  try {
    exercise = await Exercise.findById(exerciseId);
  } catch (error) {
    return next(new HttpError("Something went wrong could not update", 500));
  }
  if (exercise.userId.toString() !== req.params.uid) {
    return next(new HttpError("You are not allowed to edit this", 401));
  }
  exercise = updatedExercise;

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
  } catch {
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
    console.log("test");
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
};
