import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Wardrobe(props) {
  const [picture, setPicture] = useState({});
  const [casualShirts, setCasualShirts] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [queryImage, setQueryImage] = useState("");

  const eventApiUrl = "https://backendonspot.herokuapp.com/api/user/wardrobe";
  /*const getCasualShirts = () => {
    const tokenData = localStorage.getItem("login");
    const user = JSON.parse(tokenData);
    
    let token= "Bearer " + user.store
    console.warn(token)
    const response = axios.get(eventApiUrl,{ headers: {
      "Content-Type": 'application/json',
      "Accept":'application/json',
      'Authorization' : token
  }}).then((response) => {
      console.warn(response.data);
      setCasualShirts(response.data.wardrobe);
      console.log(response.data);
      console.log(casualShirts);
      
    });
    
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${title}`)
  }*/
  /*const onImageChange = (event) => {
    setPicture({
      // contains the preview, if you want to show the picture to the user
      //      you can access it with this.state.currentPicture
      
      picturePreview: URL.createObjectURL(event.target.files[0]),
      // this contains the file we want to send
      pictureAsFile: event.target.files[0],
    });
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setQueryImage(URL.createObjectURL(img));
    }
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
    //Append the script element on each iteration
    scripts.map((item) => {
      const script = document.createElement("script");
      script.src = item.src;
      script.async = true;
      document.body.appendChild(script);
    });
  }, []);
  const uploadPicture = (e) => {
    setPicture({
      // contains the preview, if you want to show the picture to the user
      //      you can access it with this.state.currentPicture
      
      picturePreview: URL.createObjectURL(e.target.files[0]),
      // this contains the file we want to send
      pictureAsFile: e.target.files[0],
    });
  };
async function addToPrelove(pro_id)
  {
    const tokenData = localStorage.getItem("login");
    const user = JSON.parse(tokenData);
      
    let token= "Bearer " + user.store
    let result = await fetch('https://backendonspot.herokuapp.com/api/user/wardrobe/add-preloved-item', {
          method: "POST",
          headers:{
            "Content-Type": 'application/json',
            "Accept":'application/json',
            'Authorization' : token
          },
          body:JSON.stringify({
              productId: pro_id,
              price: 300,
              brand: "Junaid Jumshaid"

          })
      })
      result= await result.json()
      if(alert(result.message)){}
      else    window.location.reload();
  }
  async function removeitem(pro_id)
  {
    const tokenData = localStorage.getItem("login");
    const user = JSON.parse(tokenData);
      
    let token= "Bearer " + user.store
    let result = await fetch('https://backendonspot.herokuapp.com/api/user/wardrobe/removeItem', {
          method: "POST",
          headers:{
            "Content-Type": 'application/json',
            "Accept":'application/json',
            'Authorization' : token
          },
          body:JSON.stringify({
              itemId: pro_id
          })
      })
      result= await result.json()
      if(alert(result.message)){}
      else    window.location.reload();
  }
  async function deleteitem(pro_id)
{
  const tokenData = localStorage.getItem("login");
  const user = JSON.parse(tokenData);
    
  let token= "Bearer " + user.store
  let result = await fetch('https://backendonspot.herokuapp.com/api/user/preloved-items/delete-item', {
        method: "POST",
        headers:{
          "Content-Type": 'application/json',
          "Accept":'application/json',
          'Authorization' : token
        },
        body:JSON.stringify({
            itemId: pro_id
            
        })
    })
    result= await result.json()
    if(alert(result.message)){}
    else    window.location.reload(); 
}
  const setImageAction = async (event) => {
    event.preventDefault();
 
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", picture.pictureAsFile);
    formData.append("description", description);
    console.log(picture.pictureAsFile);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    const tokenData = localStorage.getItem("login");
    const user = JSON.parse(tokenData);
    
    let token= "Bearer " + user.store
    console.warn(token)
    let data = await fetch("https://backendonspot.herokuapp.com/api/user/wardrobe/add-to-wardrobe", {
      method: "post",
      headers: {
        'Authorization' : token
      },
      body: formData,
    });
    data = await data.json()
    if(alert(data.message)){}
    else    window.location.reload();
    const uploadedImage = await data.json();
   
    if (uploadedImage) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Error Found");
    }
  };*/
  const baseurl = "";
  return (
    <div className="content landing">
      <div className="shop-section">
        <div className="portfolio-gallery">
          <div className="portfolio-item set-bg">
            <div class="wrapper">
              <div class="file-upload">
                <input
                  type="file"
                  class="imagesearch2"
                  type="file"
                  name="query_img"
                />
                <i class="fa fa-arrow-up"></i>
              </div>
            </div>
          </div>

          <div className="portfolio-item set-bg">
            <img class="img-size" src={queryImage} />
          </div>
        </div>
      </div>
      <div className="load ">
        <form>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </label>
        </form>
        <a className="load-more">Add to Wardrobe</a>
      </div>
      <section className="shop-section">
        <div className="container">
          <div className="row">
            {casualShirts.map((wardrobe) => {
              return (
                <div className="box col-lg-3 col-sm-6">
                  <div className="shop-item">
                    <img
                      src={`https://backendonspot.herokuapp.com/${wardrobe.image}`}
                    />
                    <div>
                      <a>
                        <img
                          class="basel-buttons icon-wishlist1"
                          src={`img/icons8-delete-30.png`}
                        />
                      </a>
                    </div>
                    {<img src="img/shop/1.jpg" alt="" />}
                    <h3>{wardrobe.title}</h3>
                    <h6>{wardrobe.description}</h6>
                    {wardrobe.preloved ? (
                      <a
                        style={{ color: "white", cursor: "pointer" }}
                        className="add-card"
                        target="_blank"
                      >
                        Remove Pre-Loved
                      </a>
                    ) : (
                      <a
                        style={{ color: "white", cursor: "pointer" }}
                        className="add-card"
                        target="_blank"
                      >
                        Add to Pre-Loved
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Wardrobe;
