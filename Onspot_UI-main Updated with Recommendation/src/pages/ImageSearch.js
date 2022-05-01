import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardBody from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Header from "../Components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from "@mui/material/Avatar";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { styled } from "@mui/material/styles";
import { Col, Row } from "react-bootstrap";
import Demo from "../pictures/shirt.webp";
import noImage from "../pictures/noImage.jpeg";
import { style } from "@mui/system";

function ImageSearch() {
  const [picture, setPicture] = useState({});
  const [casualShirts, setCasualShirts] = useState([]);
  const [queryImage, setQueryImage] = useState("");

  // Styles
  const Input = styled("input")({
    display: "none",
  });

  const onImageChange = (event) => {
    setPicture({
      /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
      picturePreview: URL.createObjectURL(event.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: event.target.files[0],
    });
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setQueryImage(URL.createObjectURL(img));
    }
  };
  useEffect(() => {
    //getBrideDresses();
    //An array of assets
    let scripts = [
      { src: "js/bootstrap.min.js" },
      { src: "js/jquery.magnific-popup.min.js" },
      { src: "js/jquery.magnific-popup.min.js" },
      { src: "js/owl.carousel.min.js" },
      { src: "js/isotope.pkgd.min.js" },
      { src: "js/circle-progress.min.js" },
      { src: "js/main.js" },
    ];
    //Append the script element on each iteration
    scripts.map((item) => {
      const script = document.createElement("script");
      script.src = item.src;
      script.async = true;
      document.body.appendChild(script);
    });
  }, []);
  // const uploadPicture = (e) => {
  //   setPicture({
  //     /* contains the preview, if you want to show the picture to the user
  //          you can access it with this.state.currentPicture
  //      */
  //     picturePreview: URL.createObjectURL(e.target.files[0]),
  //     /* this contains the file we want to send */
  //     pictureAsFile: e.target.files[0],
  //   });
  // };

  const setImageAction = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("queryImage", picture.pictureAsFile);

    console.log(picture.pictureAsFile);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const data = await fetch(
      "http://localhost:2000/api/image-search",
      {
        method: "post",
        body: formData,
      }
    );

    const uploadedImage = await data.json();
      console.log("the suggested products has",uploadedImage.suggestedProducts)
    setCasualShirts(uploadedImage.suggestedProducts);
    console.log(casualShirts);
    if (uploadedImage) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Error Found");
    }
  };

  return (
    <div>
      <Card
        sx={{ maxWidth: 1200 }}
        style={{
          margin: "80px auto",
          borderRadius: "15px",
          boxShadow: "0 0 8px",
        }}
      >
        <Row>
          <Col xs="12" md="8" style={{ textAlign: "center", padding: "20px" }}>
            <h3 style={{ fontFamily: "fantasy" }}>Search By Image</h3>

            <div
              style={{
                minHeight: "200px",
                maxHeigth: "200px",
                maxWidth: "200px",
                margin: "0px auto",
                marginTop: "20px",
              }}
            >
              <img
                class="img-size"
                src={queryImage ? queryImage : noImage}
                alt="No image"
              />
            </div>

            <label htmlFor="contained-button-file">
              <Input
                accept="image/"
                id="contained-button-file"
                multiple
                type="file"
                onChange={onImageChange}
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                style={{ background: "#154360" }}
              >
                Upload
              </Button>
            </label>

            <br></br>
            <br></br>
            <IconButton
              style={{ background: "#154360" }}
              onClick={setImageAction}
            >
              <SearchIcon style={{ color: "white" }} />
            </IconButton>
            <br></br>
            <br></br>
          </Col>
          <Col xs="12" md="4" style={{ background: "#154360" }}>
            <div className="sip">
              <h1
                className="colh "
                style={{ fontSize: "30px", textAlign: "center" }}
              >
                About Image Search
              </h1>
              <h3 className="colh textsg">
                Image Based search provides you a great ease.You just need to
                upload the image of product we and we will suggest you the
                products most similar to it
              </h3>
            </div>
          </Col>
        </Row>
      </Card>

        
      {casualShirts.length > 0 ? (
        <Card
          sx={{ maxWidth: 1200 }}
          style={{
            margin: "80px auto",
            borderRadius: "15px",
            boxShadow: "0 0 10px",
          }}
        >
          <Row>
            <Col
              xs="12"
              md="12"
              style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#154360",
              }}
            >
              <h3 style={{ fontFamily: "fantasy", color: "white" }}>
                Search Results
              </h3>
              <CardContent style={{ padding: "20px" }}>
                <Row>
                  {casualShirts ? (
                    casualShirts.length > 0 ? (
                      casualShirts.map((suggestedProducts) => (
                        <Col lg="3" md="3" sm="4" xs="6">
                          <Card
                            className="cradTransformation"
                            style={{ boxShadow: "0 0 10px" }}
                          >
                            <CardMedia className="itemCardImageDiv">
                              <img
                                src={Demo}
                                alt="No image"
                                className="img-fluid"
                                style={{ height: "300px" }}
                              />
                            </CardMedia>

                            <CardContent
                              style={{
                                marginTop: "-9px",
                                backgroundColor: "#FBFCFC",
                                minHeight: "100px",
                              }}
                            >
                              <h
                                style={{
                                  fontFamily: "Georgia",
                                  fontWeight: "500",
                                  fontSize: "18",
                                  marginLeft: "-4px",
                                }}
                              >
                                {suggestedProducts.title}{" "}
                              </h>
                              <h6
                                style={{ color: "#3498DB", marginTop: "4px" }}
                              >
                                {" "}
                                Rs: {suggestedProducts.price}{" "}
                              </h6>
                              <a
                                style={{ color: "#3498DB", marginTop: "4px" }}
                                href={suggestedProducts.productLink}
                                target="_blank"
                              >
                                See Details{" "}
                              </a>
                            </CardContent>
                          </Card>
                        </Col>
                      ))
                    ) : (
                      <strong>Loading Page Please Wait</strong>
                    )
                  ) : (
                    "Data not Found"
                  )}
                </Row>
              </CardContent>

              <br></br>
              <br></br>
              <br></br>
            </Col>
          </Row>
        </Card>
      ) : (
        ""
      )}

      <section>
        {/* <div className="container"  style={{backgroundColor:"red"}}>
   <div className="row"  style={{backgroundColor:"red"}}>
     This is the casual shirt section 
     {casualShirts.map((suggestedProducts) => {
       return (
         <div className="box col-lg-3 col-sm-6">
           <div className="shop-item">
             <img src={suggestedProducts.imageLink} alt="" />
            
           
             <h3>{suggestedProducts.title}</h3>
             <h6>{suggestedProducts.price}</h6>

             <a
               href={suggestedProducts.productLink}
               className="add-card"
               target="_blank"
             >
               See Details
             </a>
           </div>
         </div>
       );
     })}
   </div>
 </div> */}
      </section>
    </div>
  );
}

export default ImageSearch;
