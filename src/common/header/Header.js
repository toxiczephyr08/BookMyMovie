import React, { useState } from "react";
import './Header.css';
import Login from "../../screens/login/Login";
import logo from "../../assets/logo.svg";
import { Button, Modal } from "@material-ui/core";
import { Link } from "react-router-dom";
import LoginModal from "../../screens/loginModal/LoginModal";

const Header = (props) => {
    // const[showLoginModal, setShowLoginModal] = useState();
    // const [open, setOpen] = useState(false);

    // const bookMyShowHandler = (props) => {
    //     if(!(props.loggedInStatus))
    //         setShowLoginModal(true);
    // }

    // const openModalHandler = () => setOpen(true);

    return (
        <div>
            <div className="header">
                <img className="logo" src={logo} alt="" width="35px" height="35px" />
                <Login baseUrl={props.baseUrl} showBookShowButton = {props.showBookShowButton}></Login>
                
                     {/* {props.showBookShowButton && !(props.loggedInStatus)?
                        (
                            <div className="bookshow-button">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={openModalHandler}>
                                    Book Show
                                </Button>
                            
                            
                                <Modal className="modal" open={open}><Login></Login></Modal>
                                </div>
                                
                        ) : (
                            ""
                        )}

                    {props.showBookShowButton && (props.loggedInStatus)? (
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
                 */}
            </div>
        </div>

    );
};

export default Header;