import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import Users from "./user/pages/User";
import LandingPage from "./LandingPage/LandingPage"
import SignUp from "./user/pages/SignUp"
import Login from "./user/pages/Login"

import "./App.css";

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;
  
  if (token) {
    
    routes = (
      <Switch>
        <Route path="/exercises/:userId" exact>
        {console.log('app.js ' + userId)}
          <LandingPage />
        </Route>
      </Switch>
    );
  } else {
    routes = (
    <Switch>
      <Route path="/" exact>
        <LandingPage />
      </Route>
      <Route path='/users/signup' exact>
        <SignUp />
      </Route>
      <Route path='/users/login' exact>
        <Login />
      </Route>
      <Redirect to="/404" />
  </Switch>
  )
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
