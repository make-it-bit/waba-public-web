'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import classNames from 'classnames';

import { formValidation } from '@/utils/formValidation';

import { Button, TextInput, Textarea } from '@/gui-components/client';

import styles from './_form.module.scss';

const Form = ({ formData }) => {
  const pathname = usePathname();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    subject: '',
    enquiry: '',
  });
  const [message, setMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const formCheck = formValidation(form, setMessage);
    if (formCheck) {
      try {
        setSubmitted(true);
        const response = await fetch('/api/spreadsheets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            form,
            pathname,
          }),
        });
        if (response.status === 200) {
          setMessageStatus('success');
          setMessage(formData.SUCCESS);
          setForm({
            firstName: '',
            lastName: '',
            email: '',
            number: '',
            subject: '',
            enquiry: '',
          });
          setSubmitted(false);
        } else {
          setMessageStatus('error');
          setMessage(formData.UNKNOWN_ERROR);
          setSubmitted(false);
        }
      } catch (error) {
        setMessageStatus('error');
        setMessage(formData.UNKNOWN_ERROR);
        setSubmitted(false);
      }
    } else {
      setMessageStatus('error');
    }
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
                      onChange={(e) => {
                        setMessage('');
                        setForm({ ...form, firstName: e.target.value });
                      }}
                    />
                    <TextInput
                      name="last-name"
                      value={form.lastName}
                      placeholder={formData.last_name_placeholder}
                      onChange={(e) => {
                        setMessage('');
                        setForm({ ...form, lastName: e.target.value });
                      }}
                    />
                  </div>
                  <div className="flex gap-24">
                    <TextInput
                      name="email"
                      value={form.email}
                      placeholder={formData.email_placeholder}
                      onChange={(e) => {
                        setMessage('');
                        setForm({ ...form, email: e.target.value });
                      }}
                    />
                    <TextInput
                      name="number"
                      value={form.number}
                      placeholder={formData.number_placeholder}
                      onChange={(e) => {
                        setMessage('');
                        setForm({ ...form, number: e.target.value });
                      }}
                    />
                  </div>
                  <TextInput
                    name="subject"
                    value={form.subject}
                    placeholder={formData.subject_placeholder}
                    onChange={(e) => {
                      setMessage('');
                      setForm({ ...form, subject: e.target.value });
                    }}
                  />
                  <Textarea
                    name="enquiry"
                    value={form.enquiry}
                    placeholder={formData.enquiry_placeholder}
                    onChange={(e) => {
                      setMessage('');
                      setForm({ ...form, enquiry: e.target.value });
                    }}
                  />
                  {submitted && message === '' ? (
                    <div className="lg:flex contents justify-end mt-24">
                      <div className="bg-black-20 flex justify-center items-center w-fit px-24 py-8">
                        <div
                          className={classNames(
                            'w-24 h-24 border-2 border-white-100 border-b-transparent rounded-[50%]',
                            styles.loader
                          )}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="lg:flex contents justify-end mt-24">
                      <Button CTA={formData.button.href_text} onClick={handleSubmit} disabled={submitted} svg />
                    </div>
                  )}
                  {message !== '' && (
                    <div
                      className={classNames(
                        'flex justify-center items-center text-center gap-8 px-16 py-12',
                        messageStatus === 'success' ? 'bg-signal-green-10' : 'bg-signal-red-10'
                      )}
                    >
                      {messageStatus === 'success' && (
                        <Image src="/icons/check.svg" alt="check" quality={100} width={16} height={16} />
                      )}
                      <p
                        className={classNames(
                          'text-xs leading-xs',
                          messageStatus === 'success' ? 'text-signal-green-100' : 'text-signal-red-100'
                        )}
                      >
                        {message}
                      </p>
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
