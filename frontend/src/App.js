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

import "./App.css";


const LandingPage = React.lazy(()=> import ("./LandingPage/LandingPage"));
const SignUp = React.lazy(()=> import ("./user/pages/SignUp"))
const Login = React.lazy(()=> import ("./user/pages/Login"))
const NewExercise = React.lazy(()=> import ("./exercises/pages/NewExercise"))
const UserExercises= React.lazy(()=> import ("./exercises/pages/UserExercises"))
const UpdateExercise = React.lazy(()=> import ("./exercises/pages/UpdateExercise"))



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
