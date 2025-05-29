'use client';

import { Button } from "@/gui-components/client";
import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/page-components/CartContent/CartContent";

const SuccessContent = () => {
  const { removeItems } = useCartStore();

  useEffect(() => {
    // Clear the cart when payment is successful
    removeItems();
  }, [removeItems]);

  return (
    <div className="container">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-10 md:col-start-2 my-10">
          <div className="text-center">
            <h3 className="text-5xl leading-5xl font-rufina mb-4">Payment Successful!</h3>
            <p className="text-sm mb-8">Thank you for your purchase. We will process your order shortly.</p>
            <div className="flex justify-center mt-5">
              <Link href="/product">
                <Button style="tertiary" CTA="Continue Shopping" svg />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessContent; 