require("dotenv").config();

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

//User Signup Rotue
async function signup(req, res, next) {
  const errors = validationResult(req);
  if (errors.errors.length > 0) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs pass please check your data", 422)
    );
  }

  const { email, password } = req.body;

  //Check for existing user in database, each email should be unique
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(HttpError("Could not create user please try again", 500));
  }
  if (existingUser) {
    return next(new HttpError("User already exists", 422));
  }
  //hash the password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch {
    return next(new HttpError("Could not create user please try again", 500));
  }

  //Creating the user
  const createdUser = new User({
    email,
    password: hashedPassword,
    exercises: [],
  });

  //Save user to Database
  try {
    await createdUser.save();
  } catch (err) {
    return next(HttpError("Could not create user please try again", 500));
  }

  //creating a JWT for user
  let token;
  try {
    token = jwt.sign({ email: createdUser.email }, process.env.JWT_KEY, {
      expiresIn: "5h",
    });
  } catch (err) {
    return next(
      new HttpError("Creating Token Failed, please try again later", 500)
    );
  }
  
  res.status(201).json({ user: createdUser.id, email: createdUser.email, token: token });
}

//User Login

async function login(req, res, next) {
  const { email, password } = req.body;
  //check if user exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }
  //ig no user
  if(!existingUser){
      return next(
        new HttpError("User not found", 403)
      );
  }
  //check password
  let isValidPassword = false;
  try{
      isValidPassword = await bcrypt.compare(password, existingUser.password)
  } catch (err){
    return next(
        new HttpError("Logging in failed, please try again later", 403)
      );
  }
  //if incorrect passwrord
  if(!isValidPassword){
    return next(
        new HttpError("Incorrect password, please try again", 403)
      );
  }
  // if password is correct creates token
  let token;
  try {
    token = jwt.sign(
      { email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "5h" }
    );
  } catch (err) {
    return next(
      new HttpError("Logging up Failed, please try again later", 500)
    );
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
}

module.exports = {
    signup,
    login
}
