"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button, TextInput, Textarea } from "../../gui-components/client";

const Form = ({ title, content }) => {
  const router = useRouter();

  return (
    <div className="bg-supplementary-warm-gray pb-400">
      <div className="container absolute top-472 left-1/2 translate-x-neg-1/2">
        <div className="grid grid-cols-12">
          <div className="col-start-2 col-span-10 bg-white-100">
            <div className="flex justify-center gap-64 p-72">
              <div className="flex flex-col gap-32">
                <h2 className="font-rufina text-4xl leading-4xl">
                  Get in touch
                </h2>
                <p className="text-sm leading-sm">
                  If you have any questions, please complete the contact form. A
                  member of our concierge team will get back to you as soon as
                  possible.
                </p>
                <p className="text-xs leading-xs text-black-60">
                  * Mandatory Fields
                </p>
              </div>
              <div className="flex flex-col gap-24">
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
                <div className="flex justify-end">
                  <Button CTA="Send message" onClick={() => {}} svg />
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
