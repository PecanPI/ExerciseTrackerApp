import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navbar";
import ExercisesList from "./components/exercise-list";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";
import LogIn from "./components/log-in";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <div className="container d-flex flex-column min-vh-100">
        <div className="wrapper flex-grow-1">
          <Navbar />
          <br />
          <Route path="/" exact component={ExercisesList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create" component={CreateExercise} />
          <Route path="/sign-in" component={CreateUser} />
          <Route path="/log-in" component={LogIn} />
          
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
