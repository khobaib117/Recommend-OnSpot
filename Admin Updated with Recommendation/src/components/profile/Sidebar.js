import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Input from "./Input";
import logo from "../../assets/logo.png";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { baseUrl } from "../constants/BaseUrl";

const Sidebar = (props) => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const adminLogin = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${baseUrl}/api/adminlogin`, {
        email: email,
        password: password,
      });

      if (res.data.success) {
        // localStorage.setItem("AdminEmail", res.data.email);
        // localStorage.setItem("AdminPassword", res.data.password);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        window.location.reload();
      } else {
        alert("Error: " + res.data.message);
        dispatch({ type: "LOGIN_FAILURE", payload: res.data.message });
      }
    } catch (err) {
      alert("Wrong Credientials please try again later...");
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    adminLogin();
  };

  return (
    <>
      <Container>
        <LogoWrapper
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "40px",
          }}
        >
          <img style={{ width: "70%", height: "50%" }} src={logo} alt="logo" />
        </LogoWrapper>
        <Form>
          <div>
            <h3>
              <span style={{ color: "#154360" }}>Admin</span> Login
            </h3>
          </div>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button
            onClick={handleLogin}
            style={{ marginRight: "30px", backgroundColor: "#154360" }}
          >
            Sign In
          </button>
        </Form>
      </Container>
    </>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: #666666;
    font-size: 25px;
    margin-left:
    margin-bottom: 10px;
  }

  button {
    max-width: 400px;
    min-width: 300px;
    height: 55px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #70edb9;
    color: #fff;
    font-weight: 600;
    font-size: 17px;
    cursor: pointer;
    transition: all 0.2s ease-in;

    &:hover {
      transform: translateY(-3px);
    }
    @media (max-width: 550px) {
      min-width: 200px;
      height:45px;
    }
  }
`;

const LogoWrapper = styled.div`
  img {
    height: 12rem;
    padding-left: 15px;
  }

  h3 {
    color: #ff8d8d;
    text-align: center;
    font-size: 28px;
  }

  span {
    color: #5dc399;
    font-weight: 300;
    font-size: 24px;
  }
`;

const Container = styled.div`
  width: 550px;
  backdrop-filter: blur(35px);
  background-color: rgba(255, 255, 255, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 900px) {
    width: 100%;
    position: absolute;
    padding: 0;
  }

  h4 {
    color: #808080;
    font-weight: bold;
    font-size: 17px;
    margin-top: 2rem;

    span {
      color: #ff8d8d;
      cursor: pointer;
    }
  }
`;
export default Sidebar;
