import React, { Component, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import Popup from "./Popup";

const Preloved = (props) => {
  const eventApiUrl = "https://backendonspot.herokuapp.com/api/preloved-items";
  console.warn(eventApiUrl);
  const [casualShirts, setCasualShirts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  //function to get api data
  const getCasualShirts = () => {
    const response = axios.get(eventApiUrl).then((response) => {
      console.warn(response.data);
      setCasualShirts(response.data.prelovedItems);
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

  async function deleteitem(pro_id) {
    const tokenData = localStorage.getItem("login");
    const user = JSON.parse(tokenData);

    let token = "Bearer " + user.store;
    let result = await fetch(
      "https://backendonspot.herokuapp.com/api/user/preloved-items/delete-item",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          itemId: pro_id,
        }),
      }
    );
    result = await result.json();
    if (alert(result.message)) {
    } else window.location.reload();
  }

  return (
    <div>
      <section className="shop-section">
        <div className="container">
          <div className="row">
            {casualShirts.map((prelovedItems) => {
              return (
                <div className="box col-lg-3 col-sm-6">
                  <div className="shop-item">
                    <img
                      src={`https://backendonspot.herokuapp.com/${prelovedItems.image}`}
                      alt=""
                    />
                    {/* <img src="img/shop/1.jpg" alt="" /> */}
                    <h3>{prelovedItems.title}</h3>
                    <h6>{prelovedItems.price}</h6>
                    <a
                      style={{ color: "white", cursor: "pointer" }}
                      href={prelovedItems.productLink}
                      className="add-card"
                      target="_blank"
                      value="Click to Open Popup"
                      onClick={togglePopup}
                    >
                      See Details
                    </a>
                  </div>
                  {isOpen && (
                    <Popup
                      content={
                        <>
                          <p>Brand: {prelovedItems.brand}</p>
                          <p>Description: {prelovedItems.description}</p>
                        </>
                      }
                      handleClose={togglePopup}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Preloved;
