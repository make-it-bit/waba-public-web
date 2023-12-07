import React from "react";

import NavbarDesktop from "./NavbarDesktop/NavbarDesktop";
import NavbarMobile from "./NavbarMobile/NavbarMobile";

const Navbar = () => {
  return (
    <nav>
      <NavbarDesktop />
      <NavbarMobile />
    </nav>
  );
};

export default Navbar;
