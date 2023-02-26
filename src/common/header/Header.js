import React from "react";
import './Header.css';
import Login from "../../screens/login/Login";
import logo from "../../assets/logo.svg";
const Header = (props) => {

    return (
        <div>
            <div className="header">
                <img className="logo" src={logo} alt="" width="35px" height="35px" />
                <Login baseUrl={props.baseUrl} showBookShowButton = {props.showBookShowButton} movieId={props.id}></Login>                
            </div>
        </div>

    );
};

export default Header;