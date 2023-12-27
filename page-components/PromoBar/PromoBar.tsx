import React from 'react';
import classNames from 'classnames';

import styles from './_promoBar.module.scss';

const PromoBar = ({ promobarData }) => {
  return (
    <div className={classNames('bg-black-100 text-center', styles.padding)}>
      <p className="text-xs leading-xs text-white-100">{promobarData.text}</p>
    </div>
  );
};

export default PromoBar;
