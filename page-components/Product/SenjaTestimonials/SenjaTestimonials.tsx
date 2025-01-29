'use client'
import { Button } from "@/gui-components/client";
import Script from "next/script";

const SenjaTestimonials = ({ variant = 'normal' }) => {
  const toSenja = () => {
    window.location.href = 'https://senja.io/p/waba-JmM/r/6p9eyt';
  };

  return (
    <main className={`py-[50px] md:py-[108px] ${variant === 'thin' ? 'bg-[#07000E]' : 'bg-[#F3ECEE]'} w-full`}>
      {variant === 'normal' && (
        <div className="flex flex-row justify-center">
          <h3 className="font-rufina text-4xl leading-4xl mb-[50px] text-white">Customer reviews</h3>
        </div>
      )}
      <div
        className="senja-embed container"
        data-id="812fea61-8727-41a3-9111-9c10bc746a1d"
        data-lazyload="false"
        data-mode="shadow"
      ></div>
      <Script
        async
        type="text/javascript"
        src="https://widget.senja.io/widget/812fea61-8727-41a3-9111-9c10bc746a1d/platform.js"
      ></Script>
      {variant === 'normal' && (
        <div className="flex flex-row justify-center mt-[100px]">
          <Button onClick={() => toSenja()} CTA="Add review" style="primary" size="reg" />
        </div>
      )}
    </main>
  );
};

export default SenjaTestimonials;
