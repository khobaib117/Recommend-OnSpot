import React, { useState, useEffect } from "react";
import "./Main.css";
import hello from "../../assets/hello.svg";
import Chart from "../charts/Chart";
import axios from "axios";
import { baseUrl } from "../constants/BaseUrl";
import block from "../../assets/block.png";
import unblock from "../../assets/unlock.png";
import month from "../../assets/month.png";

const Main = () => {
  const [userInfo, setUserInfo] = useState({});
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    getUsersInfo();
    getFeedback();
  }, []);

  const getUsersInfo = async () => {
    const res = await axios.get(`${baseUrl}/api/getuseraccess`);

    setUserInfo(res.data.data);
  };

  const getFeedback = async () => {
    const res = await axios.get(`${baseUrl}/api/getfeedback`);

    setFeedback(res.data.data);
  };
  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello Admin</h1>
            <p>Welcome to your admin dashboard</p>
          </div>
        </div>
        <div className="main__cards">
          <div className="card">
            <i
              className="fa fa-user-o fa-2x text-lightblue"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Users</p>
              <span className="font-bold text-title">
                {userInfo?.totalUsers}
              </span>
            </div>
          </div>
          <div className="card">
            <img src={unblock} style={{ width: "50px", height: "50px" }} />
            <div className="card_inner">
              <p className="text-primary-p">Total Unblock Users</p>
              <span className="font-bold text-title">
                {userInfo?.unblockedUsers}
              </span>
            </div>
          </div>
          <div className="card">
            <img src={block} style={{ width: "50px", height: "50px" }} />
            <div className="card_inner">
              <p className="text-primary-p">Total Block Users</p>
              <span className="font-bold text-title">
                {userInfo?.blockedUsers}
              </span>
            </div>
          </div>
          <div className="card">
            <img src={month} style={{ width: "50px", height: "50px" }} />
            <div className="card_inner">
              <p className="text-primary-p">Current Month Users</p>
              <span className="font-bold text-title">
                {userInfo?.lastThirtyDaysUsers}
              </span>
            </div>
          </div>
        </div>
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Active Users</h1>
                <p>Daily Visitors</p>
              </div>
            </div>
            <Chart />
          </div>
          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Website Statistics</h1>
                <p>Website statistics based on users feedback</p>
              </div>
            </div>
            <div className="charts__right__cards">
              <div className="card1">
                <h3>Very Dissatisfied</h3>
                <p>
                  {feedback?.veryDisappointed ? feedback.veryDisappointed : 0}
                </p>
              </div>
              <div className="card2">
                <h3>Dissatisfied</h3>
                <p>{feedback?.disappointed ? feedback.disappointed : 0}</p>
              </div>
              <div className="card2">
                <h3>Neutral</h3>
                <p>{feedback?.neutral ? feedback.neutral : 0}</p>
              </div>
              <div className="card1">
                <h3>Satisfied</h3>
                <p>{feedback?.satisfied ? feedback.satisfied : 0}</p>
              </div>
              <div className="card2">
                <h3>Very Satisfied</h3>
                <p>{feedback?.verySatisfied ? feedback.verySatisfied : 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
