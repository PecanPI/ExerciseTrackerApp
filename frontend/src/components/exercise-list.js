import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from './spinner'

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={{
        pathname: "/edit/" + props.exercise._id,
        state:{
          date: props.exercise.date.substring(0, 10)
        }}
      }>edit</Link> /{" "}
      <a
        href="/"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

function ExercisesList() {
  const [exerciseList, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((res) => {
        setExercises(res.data);
        setLoading(false);
      })
      .catch((err) => {
          console.log(`Error: ${err.message}`);
      });
  }, []);

  const deleteExercise = async (id) => {
    await axios.delete("http://localhost:5000/exercises/" + id).then((res) => {
      console.log(res.data);
      setExercises(res.data);
    });
  };

  function getExerciseList() {
    if (exerciseList.length > 0) {
      return exerciseList.map((current) => {
        return (
          <Exercise
            exercise={current}
            deleteExercise={deleteExercise}
            key={current._id}
          />
        );
      });
    }
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      {loading &&
        <Spinner animation="grow" />
      }
      {!loading && 
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{getExerciseList()}</tbody>
      </table>
      }
    </div>
  );
}

export default ExercisesList;