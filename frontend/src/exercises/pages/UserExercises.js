import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function UserExercises() {
  const [loadedExercises, setLoadedExercises] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const responseData = await sendRequest(
          `${"http://localhost:5000"}/exercises/${userId}`
        );
        setLoadedExercises(responseData.places);
      } catch (err) {}
    }
    fetchPlaces();
  }, [sendRequest, userId]);

  function placeDeleteHandler(deletePlaceId) {
      setLoadedExercises(prevPlace=> prevPlace.filter(place => place.id !== deletePlaceId));
  }
  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner onOverlay />
        </div>
      )}
      {!isLoading && loadedExercises && (
        <PlaceList items={loadedExercises} onDeletePlace={placeDeleteHandler} />
      )}
    </div>
  );
}

export default UserExercises;