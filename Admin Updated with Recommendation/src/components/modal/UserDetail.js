import React from "react";
import { baseUrl } from "../constants/BaseUrl";
import axios from "axios";

const UserDetail = (props) => {
  // console.log(global.id);
  const blockUser = async (id, access) => {
    console.log(id, access);
    const res = await axios.patch(`${baseUrl}/api/updateaccess`, {
      id,
      access: false,
    });
    console.log("res==>", res);
    props.setIsOpen(false);
    alert(res.data.message);
    global.access = false;
    window.location.reload();
  };
  const unblockUser = async (id, access) => {
    console.log(id, access);
    const res = await axios.patch(`${baseUrl}/api/updateaccess`, {
      id,
      access: true,
    });
    console.log("res==>", res);
    props.setIsOpen(false);
    alert(res.data.message);
    global.access = true;
    window.location.reload();
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        padding: "40px 40px",
      }}
    >
      <img
        src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"
        alt="user img"
        height="120"
        style={{ borderRadius: "50%", paddingRight: 15 }}
        width="120"
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          margin: 10,
          width: "600px",
        }}
      >
        <p style={{ width: "300px" }}>Name: </p>
        <p style={{ width: "300px" }}>{global.name}</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          margin: 10,
          width: "600px",
        }}
      >
        <p style={{ width: "300px" }}>Email: </p>
        <p style={{ width: "300px" }}>{global.email}</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          margin: 10,
          width: "600px",
        }}
      >
        <p style={{ width: "300px" }}>Account Created: </p>
        <p style={{ width: "300px" }}>{global.createdAt}</p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          margin: 10,
          width: "600px",
        }}
      >
        <p style={{ width: "300px" }}>User Status: </p>
        <p style={{ width: "300px" }}>
          {global.access ? "Unblocked" : "Blocked"}
        </p>
      </div>
      {global.access ? (
        <div
          style={{ textDecoration: "none", marginTop: 10 }}
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
            onClick={() => blockUser(global.id, global.access)}
          >
            BLOCK
          </button>
        </div>
      ) : (
        <div
          style={{ textDecoration: "none", marginTop: 10 }}
          className="btn btn-primary"
        >
          <button
            style={{
              backgroundColor: "transparent",
              border: 0,
              color: "#fff",
              fontSize: 15,
              cursor: "pointer",
            }}
            onClick={() => unblockUser(global.id, global.access)}
          >
            UNBLOCK
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
