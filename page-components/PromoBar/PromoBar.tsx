import React from "react";
import classNames from "classnames";

import styles from "./_promoBar.module.scss";

const PromoBar = () => {
  return (
    <div className={classNames("bg-black-100 text-center", styles.padding)}>
      <p className="text-xs text-white-100">
        Black Friday - up to 30% off. VERY limited availability.
      </p>
    </div>
  );
};

export default PromoBar;
