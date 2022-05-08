import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link, Redirect } from "react-router-dom";
import { useEffect } from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
    };

    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem("login")) {
      this.setState({ login: false });
    } else {
      this.setState({ login: true });
    }
  }

  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("logHome");
    localStorage.setItem(
      "login",
      JSON.stringify({
        login: false,
        store: null,
      })
    );
    this.setState({ login: true });
  }

  render() {
    console.warn(this.state.login);
    return (
      <div>
        <header
          className="header-section"
          style={{ height: "70px", background: "grey" }}
        >
          <div className="container">
            <ul className="main-menu-left site-menu-style">
              <li>
                <Link to="/">
                  <h
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "Cambria",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    OnSpot
                  </h>
                </Link>
              </li>
              <li style={{ marginLeft: "215px" }}>
                <Link to="/">
                  <strong style={{ color: "black" }}>Home</strong>
                </Link>
              </li>

              <li style={{ marginLeft: "40px" }}>
                <Link to="/image-search">
                  <strong style={{ color: "black" }}>Search by Image</strong>
                </Link>
              </li>
              <li style={{ marginLeft: "40px" }}>
                <Link to="/favourite">
                  <strong style={{ color: "black" }}>Favourites</strong>
                </Link>
              </li>

              <li style={{ marginLeft: "40px" }}>
                <Link to="/profile">
                  <strong style={{ color: "black" }}>Profile</strong>
                </Link>
              </li>

              <li style={{ marginLeft: "20px" }}>
                <Link onClick={this.logout} to="/login">
                  {localStorage.getItem("logHome") === "true" ? (
                    <strong style={{ color: "black" }}>LOGOUT</strong>
                  ) : (
                    <strong style={{ color: "black" }}>LOGIN</strong>
                  )}
                </Link>
              </li>
            </ul>

            <li></li>

            {/* { this.state.login?
              
              <li>
              <Link  to="/login" className='log-in'><strong>Login</strong></Link>
              </li> 
              :
              <li>
                {console.log("the local store was set to #####////////////////////",localStorage.getItem('logHome'))}
              <Link onClick={this.logout} to="/login">{localStorage.getItem('logHome')==='true'?"LOGOUT":"LOGIN"}</Link>
              </li>
           
            } */}
          </div>
        </header>
      </div>
    );
  }
}
export default Header;
