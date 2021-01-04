import React, { useContext, useEffect, useState } from "react";

import ExerciseList from "../components/ExerciseList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context"

import "./ExerciseForm.css"

/*
* Gets all user exercises and displays
*/
function UserExercises() {
  const [loadedExercises, setLoadedExercises] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  function exerciseDeleteHandler(deleteExerciseId) {
    setLoadedExercises(prevExercise=> prevExercise.filter(exercises => exercises.id !== deleteExerciseId));
}

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const responseData = await sendRequest(
          `${"http://localhost:5000"}/exercises/${auth.userId}`,
          "GET",
          null,
          {
            Authorization : 'Bearer ' + auth.token
          }
        );
        setLoadedExercises(responseData.exercises);
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
        <ExerciseList items={loadedExercises} onDeleteExercise={exerciseDeleteHandler} />
      )}
    </div>
  );
}

export default UserExercises;