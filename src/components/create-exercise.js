import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise(props){
    const [exercise, setExercise] = useState({
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    })
    

    function handleChange(event) {
      
      const {name, value} = event.target;

      setExercise(prevValue => {
        if (name === "username") {
          return {
            username: value,
            description: prevValue.description,
            duration: prevValue.duration,
            date: prevValue.date
          };
        } else if (name === "description") {
          return {
            username: prevValue.username,
            description: value,
            duration: prevValue.duration,
            date: prevValue.date
          };
        } else if (name === "duration") {
          return {
            username: prevValue.username,
            description: prevValue.description,
            duration: value,
            date: prevValue.date
          };
        }

      });
    }
    function changeDate(date){
      setExercise(prevValue =>{
        return {
        username: prevValue.username,
        description: prevValue.description,
        duration: prevValue.description,
        date: date
      }
    });
    console.log(exercise);
  }

    function onSubmit(event){
      event.preventDefault()
     // window.location = '/'
    }



    return(
        <div>
        <h3>Create New Exercise Log</h3>
        <form> 
        <input
          onChange={handleChange}
          value={exercise.username}
          name="username"
          placeholder="Username"
        />
        <textarea
          onChange={handleChange}
          value={exercise.description}
          name="description"
          placeholder="Description"
        />
        <input
          onChange={handleChange}
          value={exercise.duration}
          name="duration"
          placeholder="Duration"
        />
         <DatePicker
          onChange={changeDate}
          selected={exercise.date}
          value={exercise.date}
          name="date"
          placeholder="Date"
        />
        <button onClick={
          onSubmit
        }>Submit</button>

        </form>
        </div>
    )
}

export default CreateExercise;