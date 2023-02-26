import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl } from "@mui/material";
import { FormHelperText } from "@material-ui/core";
import "./RegisterModal.css"

const RegisterModal = (props) => {

    //User Input Fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [registerDataInput, setRegisterDataInput] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    //User Validation 
    const [firstNameIsValid, setFirstNameIsValid] = useState(true);
    const [lastNameIsValid, setLastNameIsValid] = useState(true)
    const [emailIsValid, setEmailIsValid] = useState(true)
    const [passwordIsValid, setPasswordIsValid] = useState(true)
    const [contactIsValid, setContactIsValid] = useState(true)

    const inputFirstNameHandler = (event) => {
        setFirstName(event.target.value);
    };
    const inputLastNameHandler = (event) => {
        setLastName(event.target.value);
    };
    const inputEmailNameHandler = (event) => {
        setEmail(event.target.value);
    };
    const inputPasswordHandler = (event) => {
        setPassword(event.target.value);
    };
    const inputContactNoHandler = (event) => {
        setContactNo(event.target.value);
    };

    const registerHandler = async(event) => {

        event.preventDefault();
        validateFirstNameHandler();
        validateLastNameHandler();
        validateEmailHandler();
        validatePasswordHandler();
        validateContactHandler();

        const registerInfo = JSON.stringify({
            email_address: email,
            first_name: firstName,
            last_name: lastName,
            mobile_number: contactNo,
            password: password,
          });

        setRegisterDataInput(registerInfo);

        const response = await fetch(`${props.baseUrl}signup`, {
            method: "POST",
            body: registerDataInput,
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (response.status === 201) {
            setRegistrationSuccess(true);
          }

    };

    const validateFirstNameHandler = () => {
        if (!firstName)
            setFirstNameIsValid(false);
        else
            setFirstNameIsValid(true);
    };

    const validateLastNameHandler = () => {
        if (!lastName)
            setLastNameIsValid(false);
        else
            setLastNameIsValid(true);
    };

    const validateEmailHandler = () => {
        if (!email)
            setEmailIsValid(false);
        else
            setEmailIsValid(true);
    };

    const validatePasswordHandler = () => {
        if (!password)
            setPasswordIsValid(false);
        else
            setPasswordIsValid(true);
    };

    const validateContactHandler = () => {
        if (!contactNo)
            setContactIsValid(false);
        else
            setContactIsValid(true);
    };

    return (
        <div>
            <FormControl required>
                <TextField id="standard-basic" label="First Name*" variant="standard"
                    onChange={inputFirstNameHandler}
                    value={firstName}/>
                    <FormHelperText error="true">{!firstNameIsValid ? "required" : ""}</FormHelperText>
                    </FormControl>

            <FormControl>
                <TextField id="standard-basic" label="Last Name*" variant="standard"
                    onChange={inputLastNameHandler}
                    value={lastName}/>
                    <FormHelperText error="true">{!lastNameIsValid ? "required" : ""}</FormHelperText>
            </FormControl>

            <FormControl>
                <TextField id="standard-basic" label="Email*" variant="standard"
                    onChange={inputEmailNameHandler}
                    value={email} />
                    <FormHelperText error="true">{!emailIsValid ? "required" : ""}</FormHelperText>
            </FormControl>

            <FormControl>
                <TextField id="standard-basic" label="Password*" variant="standard"
                    onChange={inputPasswordHandler}
                    value={password} />
                    <FormHelperText error="true">{!passwordIsValid ? "required" : ""}</FormHelperText>                   
            </FormControl>

            <FormControl>
                <TextField id="standard-basic" label="Contact No*" variant="standard"
                    onChange={inputContactNoHandler}
                    value={contactNo} />
                    <FormHelperText error="true">{!contactIsValid ? "required" : ""}</FormHelperText> 
            </FormControl>
            <br />
            <br />
            {registrationSuccess === true && (
              <FormControl>
                <span className="successText">
                  Registration Successful. Please Login!
                </span>
              </FormControl>
            )}
            <br />
            <br />

            <div>
                <Button className="modal-login-button" variant="contained"
                    onClick={registerHandler}>Register</Button>
            </div>

        </div>
    );
};

export default RegisterModal;