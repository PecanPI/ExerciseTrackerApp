import React from "react";

import { Link } from "react-router-dom";

function ExerciseItem(props) {

  let date = new Date(props.date);
  let month = date.getMonth() + 1;
  date = date.getDate() + "/" + month + "/" + date.getFullYear();


  return (
    <React.Fragment>
      <tr
        className="exercise-row center"
      >
        <td className="exercise-column">{props.title}</td>
        <td className="exercise-column">{props.bodyLocation}</td>
        <td className="exercise-column">{props.reps}</td>
        <td className="exercise-column">{props.sets}</td>
        <td className="exercise-column">{props.weight}</td>
        <td className="exercise-column">{date}</td>
        <td className="exercise-column links">
          <Link to={`/exercises/update/${props.id}`}> Edit </Link>|
          <Link to="#" onClick={props.showWarning}>
            Delete
          </Link>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default ExerciseItem;
