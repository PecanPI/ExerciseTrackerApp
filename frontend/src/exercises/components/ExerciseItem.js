import React, { useState, useContext } from "react";

import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { Link } from "react-router-dom";

function ExerciseItem(props) {
  const auth = useContext(AuthContext);

  let date = new Date(props.date);
  let month = date.getMonth() + 1;
  date = date.getDate() + "/" + month + "/" + date.getFullYear();


  return (
    <React.Fragment>
      <tr
        className="exercise-row center"
        onClick={() => {
          let id = props.id
          props.showWarning(id);
        }}
      >
        <td className="exercise-column">{props.title}</td>
        <td className="exercise-column">{props.bodyLocation}</td>
        <td className="exercise-column">{props.reps}</td>
        <td className="exercise-column">{props.sets}</td>
        <td className="exercise-column">{props.weight}</td>
        <td className="exercise-column">{date}</td>
        <td className="exercise-column links">
          <Link to={`/exercises/${auth.userId}/update`}> Edit </Link>|
          <Link to="#" onClick={props.showWarning}>
            Delete
          </Link>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default ExerciseItem;
