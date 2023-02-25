import React, { useState } from "react";
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import "./Login.css";
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import LoginModal from "../loginModal/LoginModal";
import RegisterModal from "../registerModal/RegisterModal";
import { Link } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Login = (props) => {

  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const tabChangeHandler = (event, newValue) => {
    setValue(newValue);
  }

  const openModalHandler = () => setOpen(true);
  const closeModalHandler = () => setOpen(false);


  const setLoggedIn = (loggedIn) => {
    if (loggedIn) {
      closeModalHandler();
      setLoggedInStatus(true);
    }
    console.log("in setLoggedIn");
    console.log("loggedIn " + loggedIn);
    console.log("loggedInStatus " + loggedInStatus);

  }

  const logoutHandler = (event) => {
    sessionStorage.removeItem("uuid");
    sessionStorage.removeItem("access-token");

    setLoggedIn(false);
    setLoggedInStatus(false);
    console.log("after logout handler");
    console.log("loggedInStatus " + loggedInStatus);
  };


  return (
    <div className="login-button">
      {!loggedInStatus ? (

        <Button variant="contained" onClick={openModalHandler}>Login</Button>
      ) : (
        <Button variant="contained" onClick={logoutHandler}>Logout</Button>
      )}

      {/* {props.showBookShowButton && !loggedInStatus ? (
        <div className="bookshow-button">
          <Button
            variant="contained"
            color="primary"
            onClick={openModalHandler}
          >
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
      )} */}

      <div>
        <Modal className="modal"
          open={open}
          onClose={closeModalHandler}>

          <Box sx={{ width: '25%', bgcolor: 'background.paper' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={tabChangeHandler}>
                <Tab label="Login" />
                <Tab label="Register" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0} className="label">
              <LoginModal onLoggedIn={setLoggedIn} baseUrl={props.baseUrl}></LoginModal>
            </TabPanel>
            <TabPanel value={value} index={1} className="label">
              <RegisterModal baseUrl={props.baseUrl}></RegisterModal>
            </TabPanel>
          </Box>
        </Modal>

      </div >
    </div>
  );

};

export default Login;