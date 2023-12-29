'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Button, TextInput, Textarea } from '../../gui-components/client';

const Form = ({ formData }) => {
  const router = useRouter();

  return (
    <div className="relative lg:pb-400 z-20">
      <div className="container lg:absolute bottom-0 left-1/2 lg:translate-x-neg-1/2 lg:mb-184">
        <div className="grid grid-cols-12">
          <div className="sm:col-start-2 col-start-1 sm:col-span-10 col-span-12 lg:bg-white-100">
            <div className="grid sm:grid-cols-10 grid-cols-12 lg:gap-0 gap-y-56 lg:px-0 px-16 lg:py-0 py-72">
              <div className="col-start-1 lg:col-span-4 sm:col-span-10 col-span-12">
                <div className="flex flex-col lg:items-start items-center lg:gap-32 gap-24 lg:pl-72 lg:py-72 lg:mr-24">
                  <h2 className="font-rufina text-4xl leading-4xl">{formData.title}</h2>
                  <p className="text-sm leading-sm lg:text-left text-center">{formData.description}</p>
                  <p className="text-xs leading-xs text-black-60">* Mandatory Fields</p>
                </div>
              </div>
              <div className="lg:col-start-5 col-start-1 lg:col-span-6 sm:col-span-10 col-span-12">
                <div className="flex flex-col gap-24 lg:pr-72 lg:py-72 lg:ml-40">
                  <div className="flex gap-24">
                    <TextInput
                      name="first-name"
                      value=""
                      placeholder={formData.first_name_placeholder}
                      onChange={() => {}}
                    />
                    <TextInput
                      name="last-name"
                      value=""
                      placeholder={formData.last_name_placeholder}
                      onChange={() => {}}
                    />
                  </div>
                  <div className="flex gap-24">
                    <TextInput name="email" value="" placeholder={formData.email_placeholder} onChange={() => {}} />
                    <TextInput name="number" value="" placeholder={formData.number_placeholder} onChange={() => {}} />
                  </div>
                  <TextInput name="subject" value="" placeholder={formData.subject_placeholder} onChange={() => {}} />
                  <Textarea name="enquiry" value="" placeholder={formData.enquiry_placeholder} onChange={() => {}} />
                  <div className="lg:flex contents justify-end mt-24">
                    <Button CTA={formData.button.href_text} onClick={() => {}} svg />
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
