import React, { Component, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import $ from "jquery";
import { Link, Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Header from "../Components/Header";
import Avatar from "@mui/material/Avatar";
import Chat from "../Components/Chat";
// import scraping from  "../../public/img/tech/"
import { Row, Col } from "react-bootstrap";
import { Feedback } from "../Components/Feedback";
import { MapContainer } from "../Components/MyMap";

function Home() {
  const [products, setProducts] = useState([]);
  const [recArray, setRecArray] = useState([]);
  const [size, setSize] = useState("");
  // const eventApiUrl = "https://backendonspot.herokuapp.com/api/products/eid-wear";
  // const [casualShirts, setCasualShirts] = useState([]);
  // //function to get api data
  // const getCasualShirts = () => {
  //   const response = axios.get(eventApiUrl).then((response) => {
  //     console.warn(response.data);
  //     setCasualShirts(response.data.products);
  //     console.log(response.data);
  //     console.log(casualShirts);
  //   });
  // };

  
  const getProducts= async () => {
    
    
  
    var email = localStorage.getItem("email");

    const data = {};
    data.email = email;

    console.log("user is is set to",email);

    await axios
      .post('http://localhost:2000/api/recommendations',data)
      .then((res) => {

         const myData = res.data.data;
         
         const size = Object.keys(myData).length

         setSize(size);
         if(size>8){

          for(let i=0 ; i<8 ; i++){

            recArray.push(myData[i]);
  
          }

          setProducts(recArray);

         }
         else{

          setProducts(res.data.data);

         }
        


       
        console.log("incoming rec resposne ",res.data.data);
       
      })
      .catch((err) => {
        console.log(err);
      });


  };


  const styles = {
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9,
      marginTop: "30",
    },
  };

  useEffect(() => {
    getProducts()
    // getCasualShirts();
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
    $(".icon-wishlist").on("click", function () {
      $(this).toggleClass("in-wishlist");
    });
    //Append the script element on each iteration
    scripts.map((item) => {
      const script = document.createElement("script");
      script.src = item.src;
      script.async = true;
      document.body.appendChild(script);
    });
  }, []);
  // async function addToWishlist(pro_id)
  // {
  //   const tokenData = localStorage.getItem("login");
  //   const user = JSON.parse(tokenData);

  //   let token= "Bearer " + user.store
  //   let result = await fetch('https://backendonspot.herokuapp.com/api/user/wishlist/add-to-wishlist', {
  //         method: "POST",
  //         headers:{
  //           "Content-Type": 'application/json',
  //           "Accept":'application/json',
  //           'Authorization' : token
  //         },
  //         body:JSON.stringify({

  //           wishlistItems:{
  //             product: pro_id
  //             }
  //         })
  //     })
  //     result= await result.json()
  //     alert(result.message)
  // }
  return (
    <div>
      <section className="hero-section">
        <div className="hero-social-links">
          <a href="#">
            <i className="fa fa-pinterest" />
          </a>
          <a href="#">
            <i className="fa fa-facebook" />
          </a>
          <a href="#">
            <i className="fa fa-twitter" />
          </a>
        </div>

        <div className="hero-slider owl-carousel">
          {/* <div className="hero-slider-item set-bg" data-setbg="img/slider-bg-1.png" style={{backgroundColor:"red"}} >
              <div className="hs-content">
                <div className="container" >
                  <h2>OnSpot</h2>
                 
                </div>
              </div>
            </div> */}
          <div
            className="hero-slider-item set-bg"
            data-setbg="img/tech/bg2.jpg"
            style={{ paddingBottom: 20 }}
          >
            <div className="hs-content">
              <div className="container">
                <h2 style={{ color: "black" }}>OnSpot</h2>
              </div>
            </div>
          </div>
          <div
            className="hero-slider-item set-bg"
            data-setbg="img/tech/girl2.jpeg"
          >
            <div className="hs-content">
              <div className="container">
                <h2>OnSpot</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="quote-section">
          <div className="container">
            <div className="quote-text text-center">
              <p>"Fashion is about dressing according to what’s fashionable. Style is more about being yourself."</p>
              <h3>-Hafeez Ullah</h3>
            </div>
          </div>
        </section> */}
      {/* <div className="portfolio-section">
          <div className="portfolio-gallery">
            <div className="portfolio-item set-bg" data-setbg="img/works/1.jpg">
              <a href="img/works/1.jpg" className="portfolio-view">loadmore</a>
            </div>
            <div className="portfolio-item --disable">
            </div>
            <div className="portfolio-item set-bg" data-setbg="img/works/2.jpg">
              <a href="img/works/2.jpg" className="portfolio-view">loadmore</a>
            </div>
            <div className="portfolio-item --big set-bg" data-setbg="img/works/6.jpg">
              <a href="img/works/6.jpg" className="portfolio-view">loadmore</a>
            </div>
            <div className="portfolio-item set-bg" data-setbg="img/works/3.jpg">
              <a href="img/works/3.jpg" className="portfolio-view">loadmore</a>
            </div>
            <div className="portfolio-item set-bg" data-setbg="img/works/5.jpg">
              <a href="img/works/5.jpg" className="portfolio-view">loadmore</a>
            </div>
            <div className="portfolio-item set-bg" data-setbg="img/works/4.jpg">
              <a href="img/works/4.jpg" className="portfolio-view">loadmore</a>
            </div>
            <div className="portfolio-item set-bg" data-setbg="img/works/7.jpg">
              <a href="img/works/7.jpg" className="portfolio-view">loadmore</a>
            </div>
            <div className="portfolio-item set-bg" data-setbg="img/works/8.jpg">
              <a href="img/works/8.jpg" className="portfolio-view">loadmore</a>
            </div>
            <div className="portfolio-item set-bg" data-setbg="img/works/9.jpg">
              <a href="img/works/9.jpg" className="portfolio-view">loadmore</a>
            </div>
            <div className="portfolio-item set-bg" data-setbg="img/works/10.jpg">
              <a href="img/works/10.jpg" className="portfolio-view">loadmore</a>
            </div>
            <div className="portfolio-item set-bg" data-setbg="img/works/11.jpg">
              <a href="img/works/11.jpg" className="portfolio-view">loadmore</a>
            </div>
          </div>
        </div> }
        {/* <section className="about-secton">
          <div className="container">
            <img src="img/about-img.jpg" className="about-img" alt="" />
            <div className="row">
              <div className="col-lg-7 about-text">
                <h2>Fashions fade, style is eternal</h2>
                <p>Maecenas facilisis facilisis consequat. Curabitur fringilla pellentesque neque, imperdiet effic-tur urna gravida vel. Cras augue diam, sollicitudin sit amet felis ut, eleifend faucibus dui. Proin euismod suscipit lacus, et scelerisque nisi aliquam anunc feugiat mattis quam, ut luctus enim ultrices at. Maecenas facilisis facilisis consequat. Curabitur fringilla pellentesque neque, imperdiet efficitur urna gravida vel. Cras augue diam, sollicitudin sit amet felis ut, eleifend faucibus dui. Proin euismod suscipit lacus, et scelerisque nisi aliquam a. Nunc feugiat mattis quam, ut luctus enim ultrices at.</p>
                <img src="img/signature.png" alt="" />
              </div>
            </div>
          </div>
          <div className="about-img-box-warp">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 p-0">
                  <div className="about-img-box">
                    <img src="img/image-box.jpg" alt="" />
                  </div>
                </div>
                <div className="col-lg-6  d-lg-flex align-items-center p-0">
                  <div className="about-text-box-warp">
                    <div className="about-text">
                      <h2>The joy of dressing is an art</h2>
                      <p>Curabitur fringilla pellentesque neque, imperdiet efficitur urna gravida vel. Cras augue diam, sollicitudin sit amet felis ut, eleifend faucibus dui. Proin euismod suscipit lacus, et scelerisque nisi aliquam anunc feugiat mattis quam, ut luctus enim ultrices at. Maecenas facilisis facilisis consequat. Curabitur fringilla pellentesque neque, imperdiet efficitur urna gravida vel. Cras augue diam, sollicitudin sit amet felis ut, eleifend faucibus dui. Proin euismod suscipit lacus, et scelerisque nisi aliquam a. Nunc feugiat mattis quam, ut luctus enim ultrices at.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

      <section>
        <div
          className="container mevent"
          style={{
            marginTop: "15vh",
            background: "#154360",
            padding: "30px",
            borderRadius: "30px",
          }}
        >
          <h3 className="catetitle" style={{ text: "white", color: "white" }}>
            Select a Category
          </h3>
          <div className="row">
            <div className="col-lg-4 col-sm-4">
              <div
                style={{ width: "100%", borderRadius: "10px" }}
                className="portfolio-item set-bg"
                data-setbg="img/works/8.jpg"
              >
                <Link
                  to={{
                    pathname: "/events",
                    state: {
                      data: "man",
                    },
                  }}
                  className="portfolio-view2"
                >
                  Men
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-sm-4">
              <div
                style={{ width: "100%", borderRadius: "10px" }}
                className="portfolio-item set-bg"
                data-setbg="img/works/5.jpg"
              >
                <Link
                  to={{
                    pathname: "/events",
                    state: {
                      data: "women",
                    },
                  }}
                  className="portfolio-view2"
                >
                  Women
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-sm-4">
              <div
                style={{ width: "100%", borderRadius: "10px" }}
                className="portfolio-item set-bg"
                data-setbg="img/works/kids.jpg"
              >
                <Link
                  to={{
                    pathname: "/events",
                    state: {
                      data: "kids",
                    },
                  }}
                  className="portfolio-view2"
                >
                  Kids
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br></br>
      </section>

      <section>
          {products.length > 0 ? (
        <Card
          sx={{ maxWidth: 1400 }}
          style={{
            margin: "80px auto",
          
           
          }}
        >
          <Row>
            <Col
              xs="12"
              md="12"
              style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "",
              }}
            >
              <h3 style={{ fontFamily: "fantasy", color: "#154360"}}>
                RECOMMENDED FOR YOU 
              </h3>
              <CardContent style={{ padding: "20px" ,marginTop:"20px"}}>
                <Row>
                  {products ? (
                    products.length > 0 ? (
                      products.map((suggestedProducts) => (
                        <Col lg="3" md="3" sm="4" xs="6">
                          <Card
                            className="cradTransformation"
                            style={{ boxShadow: "0 0 10px" }}
                          >
                            <CardMedia className="itemCardImageDiv" style={{}}>
                              <img
                                src={suggestedProducts.imageLink}
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
                              <Row style={{minHeight:"70px",paddingLeft:"10px",textAlign:"center"}}>
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

                              </Row>
                            
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
                          <br></br>
                          <br></br>
                        </Col>
                      
                      ))
                    ) : (
                      <strong>Loading Page Please Wait</strong>
                    )
                  ) : (
                    "Data not Found"
                  )}
                   
                </Row>

                    {size<8?"":<Link to="/recommend">
                <Button variant="contained" size="large">View More</Button>
                </Link> 
                    }
                
                
                
             
              </CardContent>

             
              
            </Col>
            
           
          </Row>
          

        
        </Card>
      ) : (
        ""
      )}

          <br></br>
          <br></br>
          <br></br>
          <br></br>


      </section>

      <section>
        <Card
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignContent: "center",
            padding: "50px",
            boxShadow: "0 0 0px",
          }}
        >
          <h2 style={{ color: "#154360" }}>MAIN FEATURES</h2>
          <p>What makes OnSpot so special & power full ?</p>
          <br></br>
          <Row>
            <Col>
              <Card sx={{ maxWidth: 345 }}>
                <br></br>
                <CardActionArea
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <CardMedia
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      alignContent: "center",
                      display: "flex",
                      objectFit: "contain",
                      backgroundColor: "",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="img/tech/chatBot.jpeg"
                      sx={{ height: "150px", width: "150px" }}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Chat Bot
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Col>
            <Col>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <br></br>
                  <CardMedia
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      alignContent: "center",
                      display: "flex",
                      objectFit: "contain",
                      backgroundColor: "",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="img/tech/imageSearch.jpeg"
                      sx={{ height: "150px", width: "150px" }}
                    />
                  </CardMedia>

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Image Search
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Col>

            <Col>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <br></br>
                  <CardMedia
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      alignContent: "center",
                      display: "flex",
                      objectFit: "contain",
                      backgroundColor: "",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="img/tech/web.jpeg"
                      sx={{ height: "150px", width: "150px" }}
                    />
                  </CardMedia>

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Web Scrapping
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Col>

            <Col>
              <Card sx={{ maxWidth: 345 }}>
                <br></br>
                <CardActionArea
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <CardMedia
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      alignContent: "center",
                      display: "flex",
                      objectFit: "contain",
                      backgroundColor: "",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="img/tech/searchFilter.jpeg"
                      sx={{ height: "150px", width: "150px" }}
                    />
                  </CardMedia>

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Search Filters
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Col>
            <Col>
              <Card sx={{ maxWidth: 345 }}>
                <br></br>
                <CardActionArea
                  style={{
                    justifyContent: "center",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <CardMedia
                    style={{
                      justifyContent: "center",
                      textAlign: "center",
                      alignContent: "center",
                      display: "flex",
                      objectFit: "contain",
                      backgroundColor: "",
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="img/tech/rating.jpeg"
                      sx={{ height: "150px", width: "150px" }}
                    />
                  </CardMedia>

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Rating & Reviews
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Col>
          </Row>
        </Card>
      </section>
      <MapContainer />
      <section>
        <Card
          style={{
            justifyContent: "center",
            textAlign: "center",
            alignContent: "center",
            padding: "50px",
            backgroundColor: "#D7D8E0",
          }}
        >
          <h2 style={{ color: "#154360" }}>Reviews & Ratings</h2>
          <p>Reviews from the valuable users of OnSpot</p>
          <br></br>
          <CardActionArea>
            <Row>
              <Col>
                <Card
                  sx={{ height: "270px", width: "300px", borderRadius: "15px" }}
                  style={{ justifyContent: "left", textAlign: "left" }}
                >
                  <CardContent>
                    <h5> Saad Gashkori</h5>

                    <br></br>
                    <Rating name="read-only" value={4} readOnly size="small" />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ marginTop: "8px", textAlign: "left" }}
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica group of squamate reptiles, with over 6,000
                      species, ranging across all continents except
                    </Typography>
                  </CardContent>
                </Card>
              </Col>
              <Col>
                <Card
                  sx={{ height: "270px", width: "300px", borderRadius: "15px" }}
                  style={{ justifyContent: "left", textAlign: "left" }}
                >
                  <CardContent>
                    <h5> Rafay Javaid</h5>

                    <br></br>
                    <Rating name="read-only" value={5} readOnly size="small" />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ marginTop: "8px", textAlign: "left" }}
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica group of squamate reptiles, with over 6,000
                      species, ranging across all continents except
                    </Typography>
                  </CardContent>
                </Card>
              </Col>

              <Col>
                <Card
                  sx={{ height: "270px", width: "300px", borderRadius: "15px" }}
                  style={{ justifyContent: "left", textAlign: "left" }}
                >
                  <CardContent>
                    <h5> Muhammad Khubaib</h5>

                    <br></br>
                    <Rating name="read-only" value={4} readOnly size="small" />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ marginTop: "8px", textAlign: "left" }}
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica group of squamate reptiles, with over 6,000
                      species, ranging across all continents except
                    </Typography>
                  </CardContent>
                </Card>
              </Col>

              <Col>
                <Card
                  sx={{ height: "270px", width: "300px", borderRadius: "15px" }}
                  style={{ justifyContent: "left", textAlign: "left" }}
                >
                  <CardContent>
                    <h5> Sabih Imran</h5>

                    <br></br>
                    <Rating name="read-only" value={4} readOnly size="small" />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ marginTop: "8px", textAlign: "left" }}
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica group of squamate reptiles, with over 6,000
                      species, ranging across all continents except
                    </Typography>
                  </CardContent>
                </Card>
              </Col>
            </Row>
          </CardActionArea>
        </Card>
      </section>
      <Feedback />
    </div>
  );
}

export default Home;
