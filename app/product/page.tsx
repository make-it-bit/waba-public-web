import React from "react";

export const dynamic = "force-static";

import { MainInfo, ProductInfo } from "../../page-components";

const Product = () => {
  return (
    <>
      <MainInfo />
      <ProductInfo />
    </>
  );
};

export default Product;
