import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
        </div>
        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          aria-hidden="true"
        ></i>
      </div>

      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <br></br>
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-users"></i>
          <Link to="/existingmembers">Existing Users</Link>
        </div>
        <br></br>
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-user"></i>
          <Link to="/adminprofile">Profile</Link>
        </div>

        {/*
        <div className="sidebar__link">
          <i className="fa fa-user-secret" aria-hidden="true"></i>
          <Link to="/importexcelsheet">Import Excel Sheet</Link>
        </div>
 <div className="sidebar__link">
          <i className="fa fa-user-o"></i>
          
          <Link to="/sendmessages">Send Message</Link>
        </div>
        */}

        {/* <div className="sidebar__menu ">
          <i className="fa fa-user-secret" aria-hidden="true"></i>
          <Link to="/existingmembers">Existing Users</Link>
        </div> */}
        <div className="sidebar__logout">
          <i className="fa fa-power-off"></i>
          <Link
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
            to="/"
          >
            Log out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
