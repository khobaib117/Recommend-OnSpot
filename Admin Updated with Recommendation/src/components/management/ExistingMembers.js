import React, { useState, useEffect } from "react";
import "../adminStyles/AdminStyles.css";
import { Link } from "react-router-dom";
import "./ExistingMembers.css";
import UserDetail from "../modal/UserDetail";
import Modal from "../modal/Modal";
import { baseUrl } from "../constants/BaseUrl";
import axios from "axios";
const ExistingMembers = () => {
  const [arrayData, setArrData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [bgColor, setBgColor] = useState([
    "#3fc495",
    "#3664d4",
    "#f6c90e",
    "red",
  ]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    try {
      const response = await fetch(
        "https://backendonspot.herokuapp.com/api/getallusers"
      );
      const data = await response.json();
      console.log(data.data);
      setArrData(data.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteUser(id) {
    try {
      const deleteUser = await axios.post(`${baseUrl}/api/deleteUser`, {
        id,
      });
      alert(deleteUser.data.message);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main>
      <div className="main__container">
        <h1 style={{ paddingBottom: 15, color: "#343a40" }}>Users</h1>
        <h3 style={{ paddingBottom: 40 }}>
          Dashboard <span style={{ paddingLeft: 10, paddingRight: 10 }}>/</span>
          <span style={{ color: "#888" }}>Users</span>
        </h3>
        <table style={{ width: "20vw" }} className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th style={{ paddingRight: 20 }} scope="col">
                #
              </th>
              <th style={{ paddingRight: 100 }} scope="col">
                Photo
              </th>
              <th style={{ paddingRight: 225 }} scope="col">
                Name
              </th>
              <th style={{ paddingRight: 225 }} scope="col">
                Email
              </th>
              <th style={{ paddingRight: 200 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrayData.map((item, index) => (
              <tr>
                <td>
                  <div>
                    <p style={{ color: "#888", paddingRight: 20 }}>
                      {index + 1}
                    </p>
                    <p
                      style={{
                        fontStyle: "italic",
                        textDecorationLine: "underline",
                        color: "blue",
                      }}
                    ></p>
                  </div>
                </td>
                <td>
                  <div className="row">
                    <img
                      src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"
                      alt="user img"
                      height="60"
                      style={{ borderRadius: "50%", paddingRight: 15 }}
                      width="60"
                    />
                    <div>
                      <p></p>
                      <p style={{ color: "#888" }}></p>
                      <p
                        style={{
                          fontStyle: "italic",
                          textDecorationLine: "underline",
                          color: "blue",
                        }}
                      ></p>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{`${item.firstName} ${item.lastName}`}</p>
                    <p style={{ color: "#888" }}></p>
                    <p
                      style={{
                        fontStyle: "italic",
                        textDecorationLine: "underline",
                        color: "blue",
                      }}
                    ></p>
                  </div>
                </td>

                <td>
                  <div>
                    <p></p>
                    <p
                      style={{
                        color: "blue",
                        paddingTop: 5,
                      }}
                    >{`${item.email} `}</p>
                  </div>
                </td>

                <td>
                  <button
                    style={{ textDecoration: "none" }}
                    className="btn btn-primary mr-2"
                    onClick={() => {
                      setIsOpen(true);
                      global.name = `${item.firstName} ${item.lastName}`;
                      global.email = `${item.email}`;
                      global.id = `${item._id}`;
                      global.createdAt = `${item.createdAt
                        .replace(/T/, " ")
                        .replace(/\..+/, "")}`;
                      global.access = item.access;
                    }}
                  >
                    View
                  </button>

                  <div
                    style={{ textDecoration: "none" }}
                    className="btn btn-danger"
                  >
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: 0,
                        color: "#fff",
                        fontSize: 15,
                        cursor: "pointer",
                      }}
                      onClick={() => deleteUser(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <UserDetail setIsOpen={setIsOpen} />
        </Modal>
      </div>
    </main>
  );
};

export default ExistingMembers;
