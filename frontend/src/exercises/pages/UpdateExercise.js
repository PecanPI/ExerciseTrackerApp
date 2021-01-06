import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card"
import Button from "../../shared/components/FormElements/Button";
import DatePicker from "react-datepicker";
import { VALIDATOR_NUMBER, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./ExerciseForm.css";
import "react-datepicker/dist/react-datepicker.css";

function UpdateExercise(props) {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedExercise, setLoadedExercise] = useState();
  const exerciseId = useParams().eId;
  const history = useHistory();
  
  const [date, setDate] = useState(new Date());

  function changeDate(date) {
    setDate(date);
  }

  const [formState, inputHandler, setFormData] = useForm(
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
        value: "",
        isValid: false,
      },
      sets: {
        value: "",
        isValid: false,
      },
      weight: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  async function exerciseUpdateSubmitHandler(event) {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKENDURL}${"/exercises"}/exercises/${exerciseId}`,
        "PATCH",
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
      history.push(`/exercises/${auth.userId}`);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    async function fetchExercise() {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKENDURL}/exercises/${auth.userId}/${exerciseId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        setLoadedExercise(responseData.exercise);
        setFormData(
          {
            title: {
              value: responseData.exercise.title,
              isValid: true,
            },
            bodyLocation: {
              value: responseData.exercise.bodyLocation,
              isValid: true,
            },
            reps: {
              value: Number(responseData.exercise.reps),
              isValid: true,
            },
            sets: {
              value: Number(responseData.exercise.sets),
              isValid: true,
            },
            weight: {
              value: Number(responseData.exercise.weight),
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
          console.log(err);
      }
    }
    fetchExercise();
  }, [sendRequest, exerciseId, setFormData, auth]);


  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner onOverlay />
      </div>
    );
  }

  if (!loadedExercise && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find Exercise with that id!</h2>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      {loadedExercise && (
      <form className="exercise-form" onSubmit={exerciseUpdateSubmitHandler}>
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Title"
          onInput={inputHandler}
          initialValue={loadedExercise.title}
          initialValid={true}
        />
        <Input
          id="bodyLocation"
          label="Body Location"
          type="text"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a Body Location"
          onInput={inputHandler}
          initialValue={loadedExercise.bodyLocation}
          initialValid={true}
        />
        <Input
          id="reps"
          label="Reps"
          element="input"
          validators={[VALIDATOR_NUMBER()]}
          errorText="Value needs to be a number"
          onInput={inputHandler}
          initialValue={loadedExercise.reps}
          initialValid={true}
        />
        <Input
          id="sets"
          label="Sets"
          element="input"
          validators={[VALIDATOR_NUMBER()]}
          errorText="Value needs to be a number"
          onInput={inputHandler}
          initialValue={loadedExercise.sets}
          initialValid={true}
        />
        <Input
          id="weight"
          label="Weight (lbs)"
          element="input"
          validators={[VALIDATOR_NUMBER()]}
          errorText="Value needs to be a number"
          onInput={inputHandler}
          initialValue={loadedExercise.weight}
          initialValid={true}
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
            initialValue={loadedExercise.date}
          />
        </div>
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE EXERCISE
        </Button>
      </form>
      )}
    </div>
  );
}

export default UpdateExercise;
