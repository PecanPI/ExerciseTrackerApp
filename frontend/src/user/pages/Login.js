import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Auth.css";

function Auth() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  //Login
  async function submitHandler(event) {
    event.preventDefault();
    try {
      console.log(process.env.REACT_APP_BACKENDURL);
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKENDURL}/users/login`,
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.userId, responseData.token); //save login information
      history.push(`/exercises/${responseData.userId}`); //redirect to user page
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication center">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form>
          <Input
            id="email"
            element="input"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL]}
            errorText="Please enter a valid email address"
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid password, atleast 8 characters"
            onInput={inputHandler}
          />

          <Button
            type="submit"
            disabled={!formState.isValid}
            onClick={submitHandler}
          >
            {"LOGIN"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Auth;
