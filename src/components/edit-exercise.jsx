import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

function EditExercise(){

  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });
    return(
        <div>
        <p>You are on the Edit Exercise component!</p>
      </div>
    )
}

export default EditExercise;