import React, { Component, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import $ from "jquery";
import { Link, Redirect } from "react-router-dom";

function Category() {
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

  useEffect(() => {
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
    // $('.icon-wishlist').on('click', function(){
    //   $(this).toggleClass('in-wishlist');
    //   });
    // //Append the script element on each iteration
    // scripts.map((item) => {
    //   const script = document.createElement("script");
    //   script.src = item.src;
    //   script.async = true;
    //   document.body.appendChild(script);
    // });
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
      <section>
        <div className="container mevent1">
          <h2 className="catetitle">Select a Category</h2>
          <div className="row">
            <div className="col-lg-4 col-sm-4">
              <div
                style={{ width: "100%" }}
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
                style={{ width: "100%" }}
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
                style={{ width: "100%" }}
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
      </section>
    </div>
  );
}

export default Category;
