"use client";

import React from "react";

import { BusinessCareersHero, Footer } from "../../page-components";

import { Form } from "../../components";

const WabaForBusiness = () => {
  return (
    <div className="lg:bg-supplementary-warm-gray">
      <BusinessCareersHero
        image="/waba-for-business-hero-img.png"
        title="WABA for Business"
        content="At WABA, we are committed to forging partnerships that introduce
                our philosophy of cutting-edge skincare to a broader audience.
                We are eager to engage in conversations that explore how we can
                support your goals with our groundbreaking products."
      />
      <Form
        title="Get in touch"
        content="If you have any questions, please complete the contact form. A member of our concierge team will get back to you as soon as possible."
      />
      <Footer small />
    </div>
  );
};

export default WabaForBusiness;
