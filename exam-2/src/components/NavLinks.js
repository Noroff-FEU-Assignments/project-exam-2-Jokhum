import React from "react";
import { NavLink } from "react-router-dom";

function NavLinks(props) {
  return (
    <ul className="nav-menu">
      <li className="nav-menu-item" onClick={() => props.isActive && props.closeMenu()}>
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="nav-menu-item" onClick={() => props.isActive && props.closeMenu()}>
        <NavLink to="/hotels">Hotels</NavLink>
      </li>
      <li className="nav-menu-item" onClick={() => props.isActive && props.closeMenu()}>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li className="nav-menu-item" onClick={() => props.isActive && props.closeMenu()}>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
