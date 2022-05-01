import React from "react";
import { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Header from "../Components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from "@mui/material/Avatar";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";
import { Col, Row } from "react-bootstrap";
import { style } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Box from "@mui/material/Box";

import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
  const [fisrtName, setFirstName] = useState("Muhammad");
  const [lastName, setLastName] = useState("Khubaib Khan");
  const [Password, setPassword] = useState("1122");
  const [email, setEmail] = useState("khubaibKhan@gmail.com");
  const [helper, setHelper] = useState(false);
  const [change, setChange] = useState(true);
  const [open, setOpen] = useState(false);

  const [fisrtNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Styles
  const Input = styled("input")({
    display: "none",
  });

  /// fecthing  Profile data

  const profileData = async () => {
    const data = {};

    var email = localStorage.getItem("email");

    data.email = email;
    console.log("sending data is:", data);

    await axios
      .post("http://localhost:2000/retrive", data)
      .then((res) => {
        setFirstName(res.data.data.firstName);
        setLastName(res.data.data.lastName);
        setEmail(res.data.data.email);
        setPassword(res.data.data.originalPassword);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Updating Admin Profile
  const updateProfile = async () => {
    let data = {};

    data.email = email;
    data.firstName = fisrtName;
    data.lastName = lastName;
    data.originalPassword = Password;

    await axios
      .put("https://backendonspot.herokuapp.com/update", data)
      .then((res) => {
        if (res.data.code === 0) {
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleOpen() {
    setOpen(true);
  }

  const handleChange = (e, func, errorFunc) => {
    func(e.target.value);
    errorFunc(false);
  };

  //Validation Check After Button Click
  const handleClickOpen = () => {
    // Check if any field of Form is Empty
    if (
      fisrtName === "" ||
      lastName === "" ||
      email === "" ||
      Password === "" ||
      Password.length < 4
    ) {
      if (fisrtName === "") {
        setFirstNameError(true);
      }
      if (lastName === "") {
        setLastNameError(true);
      }
      if (email === "") {
        setEmailError(true);
      }
      if (Password === "") {
        setPasswordError(true);
      }
      if (Password.length < 4) {
        setHelper(true);
        setHelper(true);
      }
    } else {
      updateProfile();
    }
  };

  useEffect(() => {
    profileData();
  }, []);

  return (
    <>
      {localStorage.getItem("email") ? (
        <div>
          <Card
            sx={{ maxWidth: 700 }}
            style={{
              margin: "50px auto",
              borderRadius: "15px",
              boxShadow: "0 0 10px",
              background: "#154360",
            }}
          >
            <Row>
              <Col
                xs="12"
                md="12"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  margin: "0px auto",
                }}
              >
                <h3 style={{ fontFamily: "", color: "white" }}>Profile</h3>
                <div
                  style={{
                    minHeight: "200px",
                    maxHeigth: "200px",
                    maxWidth: "200px",
                    margin: "0px auto",
                    marginTop: "20px",
                  }}
                >
                  <Avatar
                    src="img/tech/bg2.jpeg"
                    sx={{ height: "170px", width: "170px", margin: "0px auto" }}
                  />
                </div>
                <Row sm="12">
                  <Col xs="3"></Col>
                  <Col xs="6">
                    <TextField
                      id="outlined-basic"
                      color="secondary"
                      fullWidth
                      label="First Name"
                      focused
                      value={fisrtName}
                      disabled={change === false ? true : ""}
                      // onChange={(e)=> handleChange(e, setUserName, setUserNameError)}
                      variant="filled"
                      style={{ backgroundColor: "white" }}
                    />
                  </Col>
                  <Col xs="3"></Col>
                </Row>
                <br></br>
                <Row sm="12">
                  <Col xs="3"></Col>
                  <Col xs="6">
                    <TextField
                      id="outlined-basic"
                      color="secondary"
                      focused
                      value={lastName}
                      fullWidth
                      label="Last Name"
                      variant="filled"
                      style={{ backgroundColor: "white", borderRadius: "5px" }}
                    />
                  </Col>
                  <Col xs="3"></Col>
                </Row>
                <br></br>
                <Row sm="12">
                  <Col xs="3"></Col>
                  <Col xs="6">
                    <TextField
                      id="outlined-basic"
                      color="secondary"
                      focused
                      value={email}
                      fullWidth
                      label="Email"
                      variant="filled"
                      style={{ backgroundColor: "white" }}
                    />
                  </Col>
                  <Col xs="3"></Col>
                </Row>
                <br></br>
                <Row sm="12">
                  <Col xs="3"></Col>
                  <Col xs="6">
                    <TextField
                      id="outlined-basic"
                      type="password"
                      color="secondary"
                      focused
                      value={Password}
                      fullWidth
                      label="Password"
                      variant="filled"
                      style={{ backgroundColor: "white" }}
                    >
                      <RemoveRedEyeIcon />
                    </TextField>
                  </Col>
                  <Col xs="3"></Col>
                </Row>

                <br></br>
                <br></br>

                <Button
                  variant="contained"
                  component="span"
                  size="large"
                  onClick={handleOpen}
                  style={{ background: "#154360" }}
                >
                  Update Profile
                </Button>

                <br></br>
              </Col>
              {/* <Col  xs="12" md="4" style={{background:"#154360"}}>
         <div className="sip">
         <h1 className="colh " style={{fontSize:"30px",textAlign:"center"}}>About Image Search</h1>
         <h3 className="colh textsg">Image Based search provides you a great ease.You just need to upload the image of  product we and we will suggest you the products most similar to it</h3>
         </div>
     </Col> */}
            </Row>
          </Card>

          <Dialog
            maxWidth={"xs"}
            fullWidth
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              className="dialogHeading"
              style={{
                backgroundColor: "#154360",
                color: "white",
                textAlign: "center",
              }}
              id="alert-dialog-title"
            >
              Update Profile
            </DialogTitle>
            <DialogContent className="dialogDescription">
              <br></br>
              <Row sm="12">
                <Col xs="2"></Col>
                <Col xs="8">
                  <TextField
                    id="outlined-basic"
                    color="secondary"
                    fullWidth
                    label="First Name"
                    focused
                    value={fisrtName}
                    error={fisrtNameError}
                    onChange={(e) =>
                      handleChange(e, setFirstName, setFirstNameError)
                    }
                    helperText={fisrtNameError === true ? "Field Rqruired" : ""}
                    variant="filled"
                  />
                </Col>
                <Col xs="2"></Col>
              </Row>
              <br></br>
              <Row sm="12">
                <Col xs="2"></Col>
                <Col xs="8">
                  <TextField
                    id="outlined-basic"
                    color="secondary"
                    focused
                    value={lastName}
                    fullWidth
                    label="Last Name"
                    error={lastNameError}
                    onChange={(e) =>
                      handleChange(e, setLastName, setLastNameError)
                    }
                    helperText={lastNameError === true ? "Field Rqruired" : ""}
                    variant="filled"
                    style={{ backgroundColor: "white", borderRadius: "5px" }}
                  />
                </Col>
                <Col xs="2"></Col>
              </Row>
              <br></br>
              <Row sm="12">
                <Col xs="2"></Col>
                <Col xs="8">
                  <TextField
                    id="outlined-basic"
                    color="secondary"
                    focused
                    value={email}
                    fullWidth
                    label="Email"
                    variant="filled"
                  />
                </Col>
                <Col xs="2"></Col>
              </Row>
              <br></br>
              <Row sm="12">
                <Col xs="2"></Col>
                <Col xs="8">
                  {console.log("this is the helper value ", helper)}
                  <TextField
                    id="outlined-basic"
                    color="secondary"
                    focused
                    value={Password}
                    error={PasswordError}
                    onChange={(e) =>
                      handleChange(e, setPassword, setPasswordError)
                    }
                    helperText={PasswordError === true ? helper : ""}
                    fullWidth
                    label="Password"
                    variant="filled"
                    style={{ backgroundColor: "white" }}
                  />
                </Col>
                <Col xs="2"></Col>
              </Row>
            </DialogContent>
            <br></br>
            <DialogActions style={{ backgroundColor: "" }}>
              <Grid container justify="center" style={{ textAlign: "center" }}>
                <Grid item xs={6}>
                  <Button onClick={handleClose} style={{ color: "#154360" }}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    onClick={handleClickOpen}
                    style={{ color: "#154360" }}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <Redirect from="/profile" to="login" />
      )}
    </>
  );
};

export default Profile;
