import React, { Component, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import $ from "jquery";

const Products = (props) => {
  const eventApiUrl =
    "https://backendonspot.herokuapp.com/api/products/" +
    props.location.state.data;
  console.warn(eventApiUrl);
  const [casualShirts, setCasualShirts] = useState([]);

  //function to get api data
  const getCasualShirts = () => {
    const response = axios.get(eventApiUrl).then((response) => {
      console.warn(response.data);
      setCasualShirts(response.data.products);
      console.log(response.data);
      console.log(casualShirts);
    });
  };

  useEffect(() => {
    getCasualShirts();
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
      <section className="shop-section">
        <div className="container">
          <div className="row">
            {casualShirts.map((product) => {
              return (
                <div className="box col-lg-3 col-sm-6">
                  <div className="shop-item">
                    <img src={product.imageLink} alt="" />
                    <div>
                      <a>
                        <div class="basel-buttons icon-wishlist"></div>
                      </a>
                    </div>
                    {/* <img src="img/shop/1.jpg" alt="" /> */}
                    <h3>{product.title}</h3>
                    <h6>{product.price}</h6>
                    <a
                      href={product.productLink}
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
        </div>
      </section>
    </div>
  );
};
export default Products;
