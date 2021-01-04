import React, { useState, useContext, useEffect } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ExerciseItem from "./ExerciseItem";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Modal from "../../shared/components/UIElements/Modal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function ExerciseList(props) {
  const auth = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteExerciseId, setDeleteExerciseId] = useState();

  function showDeleteWarningHandler(id) {
    setDeleteExerciseId(id);
    setShowConfirmModal(true);
  }
  function cancelDeleteWarningHandler() {
    setShowConfirmModal(false);
  }


  async function confirmDeleteHandler() {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${"http://localhost:5000/exercises/"}${
          auth.userId
        }/${deleteExerciseId}`,
        "DELETE",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDeleteExercise(deleteExerciseId);
    } catch (err) {
      console.log(err);
    }
  }
  // if user hasnt created an exercise prompt to go to page;

  if (props.items.length === 0) {
    return (
      <div className="exercise-list center">
        <Card>
          <h2> No exercises found. Create one?</h2>
          <Button to="/exercises/create/"> New Exercise </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="center">
      <ErrorModal error={error} onClear={clearError} />
      {showConfirmModal && (
        <Modal
          show={showConfirmModal}
          onCancel={cancelDeleteWarningHandler}
          header="Are you sure?"
          footerClass="place-item__modal-actions"
          footer={
            <React.Fragment>
              <Button inverse onClick={cancelDeleteWarningHandler}>
                {" "}
                CANCEL{" "}
              </Button>
              <Button danger onClick={confirmDeleteHandler}>
                {" "}
                DELETE{" "}
              </Button>
            </React.Fragment>
          }
        >
          <p>Would you like to Delete this Exercise?</p>
        </Modal>
      )}
      {isLoading && <LoadingSpinner asOverlay />}
      <Dropdown
        options={props.dropdownOptions}
        onChange={props.filter}
        // value={defaultOption}
        placeholder="Filter"
      />
      <table className="exercise-table">
        <thead>
          <tr className="exercise-row title center">
            <th className="exercise-column">Exercise</th>
            <th className="exercise-column">Body Location</th>
            <th className="exercise-column">Reps</th>
            <th className="exercise-column">Sets</th>
            <th className="exercise-column">Weight (lbs)</th>
            <th className="exercise-column">Date</th>
            <th className="exercise-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((exercise) => (
            <ExerciseItem
              className="exercise-item center"
              key={exercise.id}
              id={exercise.id}
              title={exercise.title}
              bodyLocation={exercise.bodyLocation}
              reps={exercise.reps}
              sets={exercise.sets}
              weight={exercise.weight}
              date={exercise.date}
              showWarning={showDeleteWarningHandler}
              cancelWarning={cancelDeleteWarningHandler}
              confirmDeleteHandler={confirmDeleteHandler}
            />
          ))}
        </tbody>
      </table>
      <Button to={`/exercises/create`}> New Exercise </Button>
    </div>
  );
}

export default ExerciseList;
