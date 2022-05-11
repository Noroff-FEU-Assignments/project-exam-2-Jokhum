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
    <nav className="navbar">
      <div className="nav__burger" onClick={handleClick}>
        {isActive ? <MdClose color="white" /> : <MdMenu color="white" />}
      </div>
      <div className="nav__logo">
        <NavLink to="/">
          <img src={logo} alt="Website logo" className="navbar__logo" />
        </NavLink>
      </div>
      <ul className={isActive ? "nav__list active" : "nav__list"}>
        <li className="nav__list__item">
          <NavLink to="/" className="nav__list__link" onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li className="nav__list__item">
          <NavLink to="/accommodations" className="nav__list__link" onClick={closeMenu}>
            Accommodations
          </NavLink>
        </li>
        <li className="nav__list__item">
          <NavLink to="/contact" className="nav__list__link" onClick={closeMenu}>
            Contact
          </NavLink>
        </li>
        <li className="nav__list__item">
          {auth ? (
            <NavLink to="/admin" className="nav__list__link" onClick={closeMenu}>
              Admin
            </NavLink>
          ) : (
            <NavLink to="/login" className="nav__list__link" onClick={closeMenu}>
              Login
            </NavLink>
          )}
        </li>
        {auth ? (
          <li className="nav__list__item">
            <button className="logOutButton" onClick={logout}>
              Logout
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
