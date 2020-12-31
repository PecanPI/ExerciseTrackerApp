const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.post("/signup", userController.signup);
// .catch((err) => res.status(400).json('Error: ' + err))

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  userController.login
);

module.exports = router;
