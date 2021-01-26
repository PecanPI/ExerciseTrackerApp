import React from "react";

import { Link } from "react-router-dom";

function ExerciseItem(props) {

  let date = new Date(props.date);
  date = date.getDate() + "/" + ('0' + (date.getMonth()+1)).slice(-2) 


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
          <Link to={`/exercises/update/${props.id}`}> Edit </Link>
          <Link to="#" onClick={() =>{
            const id = props.id
            props.showWarning(id)}}>
            Delete
          </Link>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default ExerciseItem;
