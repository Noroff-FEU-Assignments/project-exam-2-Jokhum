import React, { useState } from "react";
import logo from "../images/logo/logo.png";
import NavLinks from "./NavLinks";
import { HiMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";

function NavBar() {
  const [isActive, setActive] = useState(false);

  const openMenu = <HiMenu className="fa-icons" id="burger-menu" onClick={() => setActive(!isActive)} />;

  const exitMenu = <MdClose className="fa-icons" id="burger-menu" onClick={() => setActive(!isActive)} />;

  const closeMenu = function () {
    setActive(false);
  };

  return (
    <nav>
      <div>
        {isActive ? exitMenu : openMenu}
        {isActive && <NavLinks isActive={true} closeMenu={closeMenu} />}
      </div>
      <div className="nav-logo">
        <img src={logo} alt="Website logo" />
      </div>
    </nav>
  );
}

export default NavBar;
