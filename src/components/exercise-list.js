import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ExercisesList(){
  const [exercises, setExercises] = useState([])

  function componentDidMount(){
    axios.get('http://localhost:5000/exercises/')
    .then(res =>{
      console.log(res.data);
      //setExercise(res.data)
    })
    .catch(err=>{
      console.log(err);
    })
  }
  componentDidMount();
    return(
        <div>
        <p>You are on the Exercises List component!</p>
      </div>
    )
}

export default ExercisesList;