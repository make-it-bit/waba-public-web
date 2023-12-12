"use client";

import React from "react";
import classNames from "classnames";

const ProductPageNav = ({ pageIndex, navbarItems, handleClick, justify }) => {
  return (
    <div className={classNames("flex items-center mt-64 mb-32", justify)}>
      {navbarItems.map((item, index) => (
        <p
          key={index}
          className={classNames(
            "text-sm leading-sm cursor-pointer",
            pageIndex === 1 && "text-white-100",
            pageIndex === index && "underline"
          )}
          onClick={() => handleClick(index)}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default ProductPageNav;
