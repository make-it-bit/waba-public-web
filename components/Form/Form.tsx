'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { Button, TextInput, Textarea } from '../../gui-components/client';

const Form = ({ formData }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    subject: '',
    enquiry: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      number: '',
      subject: '',
      enquiry: '',
    });
    setSubmitted(true);
  };

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
                      value={form.firstName}
                      placeholder={formData.first_name_placeholder}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    />
                    <TextInput
                      name="last-name"
                      value={form.lastName}
                      placeholder={formData.last_name_placeholder}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-24">
                    <TextInput
                      name="email"
                      value={form.email}
                      placeholder={formData.email_placeholder}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <TextInput
                      name="number"
                      value={form.number}
                      placeholder={formData.number_placeholder}
                      onChange={(e) => setForm({ ...form, number: e.target.value })}
                    />
                  </div>
                  <TextInput
                    name="subject"
                    value={form.subject}
                    placeholder={formData.subject_placeholder}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                  <Textarea
                    name="enquiry"
                    value={form.enquiry}
                    placeholder={formData.enquiry_placeholder}
                    onChange={(e) => setForm({ ...form, enquiry: e.target.value })}
                  />
                  {submitted ? (
                    <div className="bg-signal-green-10 flex justify-center items-center gap-8 py-12">
                      <Image src="/icons/check.svg" alt="check" width={16} height={16} />
                      <p className="text-xs leading-xs text-signal-green-100">Thank you. You submitted successfully!</p>
                    </div>
                  ) : (
                    <div className="lg:flex contents justify-end mt-24">
                      <Button CTA={formData.button.href_text} onClick={handleSubmit} svg />
                    </div>
                  )}
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
