"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button, TextInput, Textarea } from "../../gui-components/client";

const Form = ({ title, content }) => {
  const router = useRouter();

  return (
    <div className="relative md:pb-400 z-20">
      <div className="container md:absolute bottom-0 left-1/2 md:translate-x-neg-1/2 md:mt-112 md:mb-184">
        {/* top-[-352px] */}
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-span-10 md:bg-white-100">
            <div className="grid grid-cols-10 md:gap-0 gap-y-56 md:px-0 px-16 md:py-0 py-72">
              <div className="col-start-1 md:col-span-4 col-span-10">
                <div className="flex flex-col md:items-start items-center md:gap-32 gap-24 md:pl-72 md:py-72 md:mr-64">
                  <h2 className="font-rufina text-4xl leading-4xl">{title}</h2>
                  <p className="text-sm leading-sm md:text-left text-center">
                    {content}
                  </p>
                  <p className="text-xs leading-xs text-black-60">
                    * Mandatory Fields
                  </p>
                </div>
              </div>
              <div className="md:col-start-5 col-start-1 md:col-span-6 col-span-10">
                <div className="flex flex-col gap-24 md:pr-72 md:py-72">
                  <div className="flex gap-24">
                    <TextInput
                      name="first-name"
                      value=""
                      placeholder="First Name*"
                      onChange={() => {}}
                    />
                    <TextInput
                      name="last-name"
                      value=""
                      placeholder="Last Name*"
                      onChange={() => {}}
                    />
                  </div>
                  <div className="flex gap-24">
                    <TextInput
                      name="email"
                      value=""
                      placeholder="Email*"
                      onChange={() => {}}
                    />
                    <TextInput
                      name="number"
                      value=""
                      placeholder="Phone Number*"
                      onChange={() => {}}
                    />
                  </div>
                  <TextInput
                    name="subject"
                    value=""
                    placeholder="Subject*"
                    onChange={() => {}}
                  />
                  <Textarea
                    name="enquiry"
                    value=""
                    placeholder="Enquiry*"
                    onChange={() => {}}
                  />
                  <div className="md:flex contents justify-end mt-24">
                    <Button CTA="Send message" onClick={() => {}} svg />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
