import React, { useContext, useEffect, useState } from "react";

import ExerciseList from "../components/ExerciseList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

import "./ExerciseForm.css";

/*
 * Gets all user exercises and displays
 */
function UserExercises() {
  const [loadedExercises, setLoadedExercises] = useState();
  const [allExercises, setAllExercises] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [uniqueBodyLocations, setUniqueBodyLocations] = useState();
  const auth = useContext(AuthContext);

  function exerciseDeleteHandler(deleteExerciseId) {
    setLoadedExercises((prevExercise) =>
      prevExercise.filter((exercises) => exercises.id !== deleteExerciseId)
    );
  }

  function filterHandler(filterSelection) {
    if (filterSelection.value === "all") {
        setLoadedExercises(allExercises)
    } else {
        console.log(allExercises);
      setLoadedExercises(
        allExercises.filter(
          (exercise) => exercise.bodyLocation === filterSelection.value
        )
      );
    }
  }

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const responseData = await sendRequest(
          `${"http://localhost:5000"}/exercises/${auth.userId}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        //sorts exercises, newest by date first
        let exercises = responseData.exercises.sort((a, b) => {
          if (a.date >= b.date) return -1;
          if (a.date < b.date) return 1;
        });
        setLoadedExercises(exercises);
        setAllExercises(exercises);
        setUniqueBodyLocations([
            ...new Set(exercises.map((exercise) => exercise.bodyLocation)),
            "all",
          ]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPlaces();
  }, [sendRequest, auth.userId, auth.token]);

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner onOverlay />
        </div>
      )}
      {!isLoading && loadedExercises && (
        <ExerciseList
          items={loadedExercises}
          onDeleteExercise={exerciseDeleteHandler}
          filter={filterHandler}
          dropdownOptions = {uniqueBodyLocations}
        />
      )}
    </div>
  );
}

export default UserExercises;
