import React, {Component} from 'react';
import {Helmet} from "react-helmet";

class Footer extends React.Component {

    render()
    {
        return (
            <div>
            <footer className="footer-section">
            <div className="container">
              <div className="row">
                <div className="col-xl-9 col-lg-8 col-md-7 order-md-1 order-2">
                  <h2 className="footer-logo">OnSpot</h2>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-5 order-md-2 order-1">
                  <ul className="footer-contact-list">
                    <li><span>Address:</span>ISLAMABAD</li>
                    <li><span>Phone:</span>+92 309 8758387</li>
                   
                  </ul>
                </div>
              </div>
            </div>
          </footer>
          <div className="search-model">
            <div className="h-100 d-flex align-items-center justify-content-center">
              <div className="search-close-switch">+</div>
              <form className="search-model-form">
                <input type="text" id="search-input" placeholder="Search here....." />
              </form>
            </div>
          </div>
    
          </div>
         
        )
    }
}
export default Footer