import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_NUMBER,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import DatePicker from "react-datepicker";

import "./ExerciseForm.css";
import "react-datepicker/dist/react-datepicker.css";

// Creating a new Exercise cpmponent
function NewExercise() {
  const history = useHistory();
  //history.go(0);
  const auth = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      bodyLocation: {
        value: "",
        isValid: false,
      },
      reps: {
        value: null,
        isValid: false,
      },
      sets: {
        value: null,
        isValid: false,
      },
      weight: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  async function placeSubmitHandler(event) {
    event.preventDefault();
    try {
      await sendRequest(
        `${"http://localhost:5000/exercises"}`,
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          bodyLocation: formState.inputs.bodyLocation.value,
          reps: formState.inputs.reps.value,
          sets: formState.inputs.sets.value,
          weight: formState.inputs.weight.value,
          date: date,
          userId: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push(`exercise/${auth.userId}`);
    } catch (err) {
      console.log(err);
    }
  }

  function changeDate(date) {
    setDate(date);
  }

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      <form className="exercise-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Title"
          onInput={inputHandler}
        />
        <Input
          id="bodyLocation"
          label="Body Location"
          type="text"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="reps"
          label="Reps"
          element="input"
          validators={[VALIDATOR_NUMBER()]}
          errorText="Value needs to be a number"
          onInput={inputHandler}
        />
        <Input
          id="sets"
          label="Sets"
          element="input"
          validators={[VALIDATOR_NUMBER()]}
          errorText="Value needs to be a number"
          onInput={inputHandler}
        />
        <Input
          id="weight"
          label="Weight (lbs)"
          element="input"
          validators={[VALIDATOR_NUMBER()]}
          errorText="Value needs to be a number"
          onInput={inputHandler}
        />
        <div className="form-group">
          <DatePicker
            id="date"
            label="Date"
            selected={date}
            value={date}
            onChange={changeDate}
            name="date"
            onInput={inputHandler}
          />
        </div>
        <Button type="submit" disabled={!formState.isValid}>
          ADD EXERCISE
        </Button>
      </form>
    </div>
  );
}

export default NewExercise;
