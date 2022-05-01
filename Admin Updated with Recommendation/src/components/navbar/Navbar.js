import "./Navbar.css";

import { Link, NavLink } from "react-router-dom";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        <NavLink activeClassName="active__link" to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink to="existingmembers" activeClassName="active__link">
          Existing Users
        </NavLink>
        <NavLink to="adminprofile" activeClassName="active__link">
          Profile
        </NavLink>
      </div>
      <div className="navbar__right"></div>
    </nav>
  );
};

export default Navbar;
