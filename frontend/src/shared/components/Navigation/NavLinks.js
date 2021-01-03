import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";
function NavLinks(props) {
  const auth = useContext(AuthContext);
  
  return (
    <div>
      <ul className="nav-links">
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/exercises/${auth.userId}`} exact>
              {" "}
              My Exercises
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/exercises/create" exact>
              {" "}
              Create Exercise
            </NavLink>
          </li>
        )}
        {/* {auth.isLoggedIn && (
          <li>
            <NavLink to={`/${auth.userId}/places`}> My Exercises</NavLink>
          </li>
        )} */}
        {/* {auth.isLoggedIn && (
          <li>
            <NavLink to="/places/new"> ADD PLACE</NavLink>
          </li>
        )} */}
        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/users/login">Login</NavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <NavLink to="/users/signup">Sign Up</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <button onClick={auth.logout}> Logout </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavLinks;
