import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import LandingPage from "./LandingPage/LandingPage";
import SignUp from "./user/pages/SignUp";
import Login from "./user/pages/Login";
import NewExercise from "./exercises/pages/NewExercise";
import UserExercises from "./exercises/pages/UserExercises";
import UpdateExercise from "./exercises/pages/UpdateExercise"

import "./App.css";


function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/exercises/create" exact>
          <NewExercise />
        </Route>
        <Route path="/exercises/update/:eId" exact>
          <UpdateExercise />
        </Route>
        <Route path="/exercises/:userId">
          <UserExercises />
        </Route>

        {/* 404 page Route */}
        <Route component={UserExercises} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/users/signup" exact>
          <SignUp />
        </Route>
        <Route path="/users/login" exact>
          <Login />
        </Route>
        <Route component={LandingPage} />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <div className="container d-flex flex-column min-vh-100">
          <div className="wrapper flex-grow-1">
            <MainNavigation />
            <Switch>
              <Suspense
                fallback={
                  <div className="center">
                    <LoadingSpinner></LoadingSpinner>
                  </div>
                }
              >
                {routes}
              </Suspense>
            </Switch>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
