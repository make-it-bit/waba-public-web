'use client';
import React from 'react';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

import styles from './_promoBar.module.scss';

const PromoBar = ({ promobarData }) => {
  const pathname = usePathname();

  if (pathname.includes('/offers')) return null;
  return (
    <div className={classNames('bg-black-100 text-center', styles.padding)}>
      <p className="text-xs leading-xs text-white-100">{promobarData.text}</p>
    </div>
  );
};

export default PromoBar;
