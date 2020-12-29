import React, { useState } from 'react';
import axios from 'axios'

function CreateUser(props){
    const[user, setUsername] = useState({
      username: ''
    })

    function handleChange(event){
        const {name, value} = event.target;
        setUsername(prevVals =>{
          if(name === 'username'){
            return {username: value};
          }  
        })
    }

    function onSubmit(event){
      event.preventDefault();
      console.log(user);
      axios.post("http://localhost:5000/users/login", user)
      .then(res=>{ console.log(res.data);})
      .catch(err=>{console.log(err);})
      setUsername(prevVals =>{
        return {username: ''};
      })
    }
    
    return(
      <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <input  type="text"
              required
              className="form-control"
              name="username"
              value={user.username}
              onChange={handleChange}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
}

export default CreateUser;