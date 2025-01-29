'use client'
import Script from "next/script";

const SenjaRating = ({ variant = 'normal' }) => {
  const variantUrl = variant === 'normal'
    ? "https://widget.senja.io/widget/ef7fd5a8-4aef-46ff-bd3b-d4c6b25f51c8/platform.js"
    : "https://widget.senja.io/widget/926758f2-27ec-4c1f-b608-b0cd6faec9b4/platform.js"

  const variantDataId = variant === 'normal'
   ? "ef7fd5a8-4aef-46ff-bd3b-d4c6b25f51c8"
   : "926758f2-27ec-4c1f-b608-b0cd6faec9b4"
  return (
    <main>
      <div 
        className="senja-embed" 
        data-id={variantDataId}
        data-mode="shadow" 
        data-lazyload="false" 
      />
      <Script
        async
        type="text/javascript"
        src={variantUrl}
      ></Script>
    </main>
  );
};

export default SenjaRating;
