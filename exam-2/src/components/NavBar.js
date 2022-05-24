import React, { useState } from "react";
import logo from "../images/logo/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { MdClose, MdMenu } from "react-icons/md";

export default function NavBar() {
  const [isActive, setActive] = useState(false);
  const closeMenu = () => setActive(false);
  const handleClick = () => setActive(!isActive);
  const [auth, sethAuth] = useContext(AuthContext);
  const history = useNavigate();

  const logout = () => {
    sethAuth(null);
    history("/");
    closeMenu();
  };

  return (
    <nav className="NavBar">
      <div className="Nav__Burger" onClick={handleClick}>
        {isActive ? <MdClose color="white" /> : <MdMenu color="white" />}
      </div>
      <div className="Nav__Logo">
        <NavLink to="/">
          <img src={logo} alt="Website logo" className="Navbar__Logo" />
        </NavLink>
      </div>
      <ul className={isActive ? "Nav__List Active" : "Nav__List"}>
        <li className="Nav__List__Item">
          <NavLink to="/" className="Nav__List__Link" onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li className="Nav__List__Item">
          <NavLink to="/accommodations" className="Nav__List__Link" onClick={closeMenu}>
            Accommodations
          </NavLink>
        </li>
        <li className="Nav__List__Item">
          <NavLink to="/contact" className="Nav__List__Link" onClick={closeMenu}>
            Contact
          </NavLink>
        </li>
        <li className="Nav__List__Item">
          {auth ? (
            <NavLink to="/admin" className="Nav__List__Link" onClick={closeMenu}>
              Admin
            </NavLink>
          ) : (
            <NavLink to="/login" className="Nav__List__Link" onClick={closeMenu}>
              Login
            </NavLink>
          )}
        </li>
        {auth ? (
          <li className="Nav__List__Item">
            <button className="LogOutButton" onClick={logout}>
              Logout
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
