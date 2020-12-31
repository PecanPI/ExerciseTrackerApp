const express = require('express')
const { check } = require("express-validator");
const exerciseControllers = require("../controllers/exercise-controllers")

const router = express.Router()

router.get("/:uid", exerciseControllers.getExerciseByUserId)

router.post("/", exerciseControllers.createExercise)

router.patch("/:uid/:eid", exerciseControllers.updateExercise)

router.delete("/:uid/:eid", exerciseControllers.deleteExercise)

module.exports = router;