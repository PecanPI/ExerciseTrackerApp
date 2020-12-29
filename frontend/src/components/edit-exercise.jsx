import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function EditExercise(props) {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    id: "",
  });

  useEffect(() => {
    let fetch = async () => {
      await axios
        .get("http://localhost:5000/exercises/" + props.match.params.id)
        .then((exe) => {
          console.log(exe.data.username);
          let name = exe.data.username
          setExercise((prevValues) => {
            return {
              username: name,
              description: exe.data.description,
              duration: exe.data.duration,
              date: new Date(exe.data.date),
              id: exe.data._id,
            };
          });
        })
    .catch(err => console.log(err))
    };
    fetch(); 
  },[props.match.params.id]);


  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name, value);

    setExercise((prevValue) => {
      if (name === "username") {
        return {
          username: value,
          description: prevValue.description,
          duration: prevValue.duration,
          date: prevValue.date,
          id: prevValue.id
        };
      } else if (name === "description") {
        return {
          username: prevValue.username,
          description: value,
          duration: prevValue.duration,
          date: prevValue.date,
          id: prevValue.id
        };
      } else if (name === "duration") {
        return {
          username: prevValue.username,
          description: prevValue.description,
          duration: value,
          date: prevValue.date,
          id: prevValue.id
        };
      }
    });
  }

  function changeDate(date) {
    console.log(date);
    setExercise((prevValue) => {
      return {
        username: prevValue.username,
        description: prevValue.description,
        duration: prevValue.description,
        date: date,
        id: prevValue.id
      };
    });
  }

  function Submit(event) {
    console.log(typeof exercise.date);
    axios.delete("http://localhost:5000/exercises/" + props.match.params.id)
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
    window.location = "/";
  }

  return (
    <div>
    <h3>Edit Exercise Log</h3>
    <form onSubmit={Submit}>
      <div className="form-group"> 
        <label>Username: </label>
        <input type='text'
            required
            className="form-control"
            name="username"
            value={exercise.username}
            onChange={handleChange}>
        </input>
      </div>
      <div className="form-group"> 
        <label>Description: </label>
        <input  type="text"
            required
            className="form-control"
            name="description"
            value={exercise.description}
            onChange={handleChange}
            />
      </div>
      <div className="form-group">
        <label>Duration (in minutes): </label>
        <input 
            type="text" 
            className="form-control"
            name="duration"
            value={exercise.duration}
            onChange={handleChange}
            />
      </div>
      <div className="form-group">
        <label>Date: </label>
        <DatePicker
            onChange={changeDate}
            selected={exercise.date}
            className="form-control"
            value={exercise.date}
            required
            name="date"
            placeholder="Date"
          /> 
      </div>

      <div className="form-group">
        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
      </div>
    </form>
  </div>
  );
}

export default EditExercise;
