import React from 'react';

import NavbarDesktop from './NavbarDesktop/NavbarDesktop';
import NavbarMobile from './NavbarMobile/NavbarMobile';

const Navbar = async ({ navbarData }) => {
  return (
    <nav>
      <NavbarDesktop navbarData={navbarData} />
      <NavbarMobile navbarData={navbarData} />
    </nav>
  );
};

export default Navbar;
