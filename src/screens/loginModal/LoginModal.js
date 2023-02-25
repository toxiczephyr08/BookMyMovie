import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from "@mui/material";
import "./LoginModal.css";
import { FormHelperText } from "@material-ui/core";

const LoginModal = (props) => {

    const [loggedIn, setLoggedIn] = useState(
        sessionStorage.getItem("access-token") == null ? false : true);
    //User Input username and password
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loginDataInput, setLoginDataInput] = useState("");

    //validation for username and password
    const [userNameIsValid, setUserNameIsValid] = useState(true)
    const [passwordIsValid, setPasswordIsValid] = useState(true)


    const inputUserNameHandler = (event) => {
        setUserName(event.target.value);
    }

    const inputPasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const submitThis = async () => {

        validateUserNameEntered();
        validatePasswordEntered();

        const response = await fetch(`${props.baseUrl}auth/login`, {
            method: "POST",
            headers: {
              Authorization: `Basic ${window.btoa(`${userName}:${password}`)}`,
            },
          });
          console.log("response.status = "+response.status);
          if (response.status === 200) {
            setLoggedIn(true);
            const data = await response.json();
            sessionStorage.setItem("uuid", data.id);
            sessionStorage.setItem(
              "access-token",
              response.headers.get("access-token")
            );
            
            console.log("looooggged in "+loggedIn);
            props.onLoggedIn(loggedIn);
          }
    }

    const validateUserNameEntered = () => {
        if (userName)
            setUserNameIsValid(true);
        else
            setUserNameIsValid(false);
    }

    const validatePasswordEntered = () => {
        if (password)
            setPasswordIsValid(true);
        else
            setPasswordIsValid(false);
    }

    return (
        <div>
            <div>
                <FormControl className="label" >
                    <FormControl>
                        <TextField id="standard-basic" label="Username*" variant="standard"
                            onChange={inputUserNameHandler}
                            value={userName} />
                        <FormHelperText error={Boolean(true)}>{!userNameIsValid ? "required" : ""}</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <TextField id="standard-basic" label="Password*" variant="standard"
                            onChange={inputPasswordHandler}
                            value={password} />
                        <FormHelperText error={Boolean(true)}>{!passwordIsValid ? "required" : ""}</FormHelperText>
                    </FormControl><br />
                    <div>
                        <Button className="modal-login-button" variant="contained"
                            onClick={submitThis}>Login</Button>
                    </div>
                </FormControl>

            </div>

        </div>
    );
};

export default LoginModal;