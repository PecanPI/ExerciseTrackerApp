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
              date: exe.data.date,
              id: exe.data._id,
            };
          });
          console.log(exercise);
        })
    .catch(err => console.log(err))
    };
    fetch();
    
  }, []);

  return (
    <div>
      <p>You are on the Edit Exercise component!</p>
    </div>
  );
}

export default EditExercise;
