import React from "react";
import { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import { Button, CardActionArea, CardActions } from "@mui/material";

import Avatar from "@mui/material/Avatar";

import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";
import { Col, Row } from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Profile = () => {
  const [Password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [helper, setHelper] = useState(false);
  const [change, setChange] = useState(false);
  const [open, setOpen] = useState(false);

  const [PasswordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Styles
  const Input = styled("input")({
    display: "none",
  });

  /// fecthing  Profile data

  const profileData = async () => {
    setChange(false);
    var data = JSON.parse(localStorage.getItem("user"));
    setEmail(data.email);
    setPassword(data.password);
  };

  // Updating Admin Profile
  const updateProfile = async () => {
    let dat = JSON.parse(localStorage.getItem("user"));
    let data = {};

    data.email = dat.email;
    data.password = Password;
    data.newEmail = email;

    await axios
      .post("https://backendonspot.herokuapp.com/api/updateprofile", data)
      .then((res) => {
        if (res.data.code === 0) {
          try {
            setOpen(false);
            setChange(true);

            var data = JSON.parse(localStorage.getItem("user"));
            data.email = email;
            data.password = Password;
            console.log(data.password);

            localStorage.setItem("user", JSON.stringify(data));
            alert("Successfully Profile Updated");
          } catch (error) {
            console.log(error);
          }
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
    if (email === "" || Password === "" || Password.length < 4) {
      if (email === "") {
        setEmailError(true);
      }
      if (Password === "") {
        setPasswordError(true);
      }
      if (Password.length < 4) {
        setHelper(true);
      }
    } else {
      updateProfile();
    }
  };

  useEffect(() => {
    profileData();
  }, [change]);

  return (
    <>
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
                    focused
                    value={email}
                    fullWidth
                    label="Email"
                    variant="filled"
                    disabled={true}
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
                    disabled={true}
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
          <DialogContent>
            <br></br>

            <Row sm="12">
              <Col sm="4"></Col>

              <Col sm="6" style={{ marginLeft: "100px" }}>
                <TextField
                  id="outlined-basic"
                  color="secondary"
                  focused
                  value={email}
                  fullWidth
                  label="Email"
                  variant="filled"
                  onChange={(e) => handleChange(e, setEmail, setEmailError)}
                />
              </Col>
              <Col xs="2"></Col>
            </Row>
            <br></br>
            <Row sm="12">
              <Col xs="2"></Col>
              <Col xs="2"></Col>
              <Col sm="8" style={{ marginLeft: "100px" }}>
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
    </>
  );
};

export default Profile;
