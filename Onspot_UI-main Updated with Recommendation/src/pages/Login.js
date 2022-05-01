import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Components/Header";
import axios from "axios";
import { useHistory } from "react-router";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      login: false,
      store: null,
    };
  }
  componentDidMount() {
    this.storeCollector();
  }

  storeCollector() {
    let store = JSON.parse(localStorage.getItem("login"));

    console.log("Here is store: " + store);
    if (store && store.login) {
      this.setState({ login: true, store: store });
    }
  }
  async login() {
    var Email;
    console.log(this.state);
    let result = await fetch("http://localhost:2000/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });
    result = await result.json();
    console.warn(result.token);

    if (result.code == -1) {
      alert("User account has been blocked ");
    } else {
      if (result.token == null) {
        this.setState({ login: false });
        alert("Enter correct username and password!");
      } else {
        window.location.href = "/";
        localStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            store: result.token,
          })
        );
        localStorage.setItem("logHome", true);
        console.log("email to be save is ", this.state.email);
        localStorage.setItem("email", this.state.email);
        // const userOnlineEmail=localStorage.getItem("email")
        //   if(userOnlineEmail!=null && useronlineEmail != undefined)
        //   {
        //     //do chat
        //   }else{
        //     //show alert please login
        //   }
        this.storeCollector();
      }
    }
  }
  post() {
    let token = "Bearer " + this.state.store.store;
    console.log(this.state.store.store);
    fetch("https://backendonspot.herokuapp.com/api//user/wishlist", {
      method: "GET",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify(this.state.post),
    }).then((response) => {
      response.json().then((result) => {
        console.warn("result", result);
      });
    });
  }

  render() {
    if (this.state.login) {
      return <Redirect to={"/"} />;
    }

    return (
      <div>
        {!this.state.login ? (
          <section>
            <div className="container-fluid cona  ">
              <div className="row wmar2">
                <div className="col-lg-8 col-md-8 textal  ">
                  <h1 className="signcol">Sign in to OnSpot</h1>

                  <form>
                    <div>
                      <input
                        className="em"
                        onChange={(event) => {
                          this.setState({ email: event.target.value });
                        }}
                        type="text"
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <input
                        className="em"
                        onChange={(event) => {
                          this.setState({ password: event.target.value });
                        }}
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                    <p className="textb">Forgot your password?</p>
                  </form>
                  <button
                    onClick={() => {
                      this.login();
                    }}
                    className="fbtn btn btn-default"
                  >
                    Sign in
                  </button>
                </div>

                <div className="col-lg-4 col-md-4 colred">
                  <div className="sip">
                    <h1 className="colh ">Hi, Friend!</h1>
                    <h3 className="colh textsg">
                      Enter your personal details and start your journey with
                      us.
                    </h3>
                    <button className="sbtn btn btn-default">
                      <Link to="/Signup">SIGN UP</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div>
            <textarea
              onChange={(event) => this.setState({ post: event.target.value })}
            ></textarea>
            <Link to="/about" onClick={() => this.post()}>
              Post
            </Link>
          </div>
        )}
      </div>
    );
  }
}
