'use client';
import React from 'react';
import { usePathname } from 'next/navigation';

import NavbarDesktop from './NavbarDesktop/NavbarDesktop';
import NavbarMobile from './NavbarMobile/NavbarMobile';

const Navbar = ({ navbarData }) => {
  const pathname = usePathname();

  if (pathname.includes('/downloadables')) return null;
  return (
    <nav>
      <NavbarDesktop navbarData={navbarData} />
      <NavbarMobile navbarData={navbarData} />
    </nav>
  );
};

export default Navbar;
