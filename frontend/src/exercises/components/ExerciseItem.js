import React, { useState, useContext } from "react";

import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

function ExerciseItem(props) {
  const auth = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  let date = new Date(props.date);
  let month = date.getMonth() + 1;
  date = date.getDate() + "/" + month + "/" + date.getFullYear();

  function showDeleteWarningHandler() {
    setShowConfirmModal(true);
  }
  function cancelDeleteWarningHandler() {
    setShowConfirmModal(false);
  }

  async function confirmDeleteHandler() {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${"http://localhost:5000/"}${auth.userId}/${props.items.eid}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
    //props.onDelete(props.id);
  }

  return (
    
      
      <tr className="exercise-row center" onClick={props.onclick}>
        <td className="exercise-column">{props.title}</td>
        <td className="exercise-column">{props.bodyLocation}</td>
        <td className="exercise-column">{props.reps}</td>
        <td className="exercise-column">{props.sets}</td>
        <td className="exercise-column">{props.weight}</td>
        <td className="exercise-column">{date}</td>
        {/* <td className='exercise-column'>
          {auth.userId === props.creatorId && (
            <Button to={`/places/${props.id}`}> EDIT</Button>
          )}
          {auth.userId === props.creatorId && (
            <a href="/" onClick={showDeleteWarningHandler}>
              | DELETE
            </a>
          )}
        </td> */}
      </tr>
    
  );
}

export default ExerciseItem;
