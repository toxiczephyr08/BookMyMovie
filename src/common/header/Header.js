import React, { useState } from "react";
import './Header.css';
import Login from "../../screens/login/Login";
import logo from "../../assets/logo.svg";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Header = (props) => {
    const [loggedInStatus, setLoggedInStatus] = useState(false);
    const checkLoggedIn = (loggedIn) => {
        setLoggedInStatus(loggedIn);

    };

    return (
        <div>
            <div className="header">
                <img className="logo" src={logo} alt="" width="35px" height="35px" />
                <Login baseUrl={props.baseUrl} onCheckLoggedIn={checkLoggedIn}></Login>
                
                     {props.showBookShowButton&& !loggedInStatus ?
                        (
                            <div className="bookshow-button">
                                <Button
                                    variant="contained"
                                    color="primary">
                                    Book Show
                                </Button>
                            </div>
                        ) : (
                            ""
                        )}

                    {props.showBookShowButton && loggedInStatus ? (
                        <div className="bookshow-button">
                            <Link to={"/bookshow/" + props.id}>
                                <Button variant="contained" color="primary">
                                    Book Show
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        ""
                    )}
                
            </div>
        </div>

    );
};

export default Header;