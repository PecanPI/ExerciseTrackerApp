import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise(props) {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/exercises/")
        .then((res) => {
          if (res.data.length > 0) {
            let users = res.data.map((users) => users.username);

            setExercise((prevValues) => {
              return {
                username: users[0],
                description: "",
                duration: 0,
                date: new Date(),
                users: users,
              };
            });
          }
        })
        .catch((err) => {
          console.log("Error: " + err);
        });

      //setExercise({ username: users[0] })
    };
    fetchData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setExercise((prevValue) => {
      if (name === "username") {
        return {
          username: value,
          description: prevValue.description,
          duration: prevValue.duration,
          date: prevValue.date,
        };
      } else if (name === "description") {
        return {
          username: prevValue.username,
          description: value,
          duration: prevValue.duration,
          date: prevValue.date,
        };
      } else if (name === "duration") {
        return {
          username: prevValue.username,
          description: prevValue.description,
          duration: value,
          date: prevValue.date,
        };
      }
    });
  }

  function changeDate(date) {
    setExercise((prevValue) => {
      return {
        username: prevValue.username,
        description: prevValue.description,
        duration: prevValue.description,
        date: date,
      };
    });
  }

  function componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then((res) => {
        if (res.data.length > 0) console.log(res.data);
        setUsers(res.data.map((user) => user.username));
        setExercise({ username: users[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //componentDidMount();

  function Submit(event) {
    console.log(exercise);
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
    // window.location = '/'
  }

  return (
    <div>
      <h3> Create New Exercise Log </h3>
      <form onSubmit={Submit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={exercise.username}
            name="username"
            required
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange}
            value={exercise.description}
            className="form-control"
            required
            name="description"
            placeholder="Description"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            onChange={handleChange}
            required
            value={exercise.duration}
            className="form-control"
            name="duration"
            placeholder="Duration"
          />
        </div>
        <div className="form-group">
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
          <input
            type="submit"
            value="Create Exercise"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExercise;
