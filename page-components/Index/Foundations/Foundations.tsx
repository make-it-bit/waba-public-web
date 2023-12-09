"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { FoundationCard } from "../../../components";

import styles from "./_foundations.module.scss";
import { Button } from "../../../gui-components/client";

const Foundations = () => {
  const router = useRouter();

  return (
    <div className={styles.background}>
      <div className="container">
        <div className="flex flex-col">
          <div className="grid grid-cols-12">
            <div className="col-start-5 col-span-4 text-center mt-160 mb-144">
              <h1 className="font-rufina text-4xl leading-4xl text-black-100">
                Beauty Built on Three Foundations
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-80">
            <div className="col-start-1 col-span-4">
              <FoundationCard
                icon="/icons/easy.svg"
                title="Easy-to-use"
                content="Blue Light therapy focuses on achieving a clearer and more harmonious complexion by specifically targeting common skin concerns such as spots."
              />
            </div>
            <div className="col-start-5 col-span-4">
              <FoundationCard
                icon="/icons/effective.svg"
                title="Effective"
                content="Patented light beam shaping lens ensures rapid and guaranteed results, while the optical homogenized light output guarantees even distribution across all skin areas."
                leftBorder
                rightBorder
              />
            </div>
            <div className="col-start-9 col-span-4">
              <FoundationCard
                icon="/icons/safe.svg"
                title="Safe"
                content="A natural, non-invasive device crafted from medical-grade materials, rigorously tested for safety."
              />
            </div>
          </div>
          <div className="flex justify-center mb-[108px]">
            <Button
              CTA="Discover Product"
              onClick={() => router.push("#")}
              svg
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foundations;
