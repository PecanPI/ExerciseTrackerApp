const express = require("express");
const { check } = require("express-validator");
const exerciseControllers = require("../controllers/exercise-controllers");
const checkAuth = require("../middleware/check-auth");
const router = express.Router({ mergeParams: true });

router.use(checkAuth);

router.get("/:uid", exerciseControllers.getExerciseByUserId);

router.get("/:uid/:eid", exerciseControllers.getExerciseById);

router.post(
  "/",
  [
    check("title").trim().not().isEmpty(),
    check("bodyLocation").trim().not().isEmpty(),
    check("reps").isNumeric(),
    check("sets").isNumeric(),
    check("weight").isNumeric(),
  ],
  exerciseControllers.createExercise
);

router.patch(
  "/:uid/:eid",
  [
    check("title").trim().not().isEmpty(),
    check("bodyLocation").trim().not().isEmpty(),
    check("reps").isNumeric(),
    check("sets").isNumeric(),
    check("weight").isNumeric(),
  ],
  exerciseControllers.updateExercise
);

router.delete("/:uid/:eid", exerciseControllers.deleteExercise);

module.exports = router;
