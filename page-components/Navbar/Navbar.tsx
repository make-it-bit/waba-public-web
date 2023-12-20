import React from 'react';

/* import { getLayoutData, getPageLinks } from '../../lib/strapi'; */

import NavbarDesktop from './NavbarDesktop/NavbarDesktop';
import NavbarMobile from './NavbarMobile/NavbarMobile';

const Navbar = async () => {
  /* const navbarData = await getLayoutData('navbar');
  const pageLinks = await getPageLinks(); */

  return (
    <nav>
      <NavbarDesktop /* navbarData={navbarData.attributes} pageLinks={pageLinks} */ />
      <NavbarMobile /* navbarData={navbarData.attributes} pageLinks={pageLinks} */ />
    </nav>
  );
};

export default Navbar;
