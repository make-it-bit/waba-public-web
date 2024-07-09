'use client';
import { useState } from 'react';

import { TextInput, Button } from '@/gui-components/client';

import { downloadableFormValidation } from '@/utils/formValidation';

const DownloadableForm = ({ form, buttonCta }) => {
  const { success_message: successMessage, error_message: errorMessage, fields } = form;

  const [formFields, setFormFields] = useState(
    fields.reduce((acc, field) => {
      acc[field.field_name] = '';
      return acc;
    }, {})
  );

  const [formErrors, setFormErrors] = useState(
    fields.reduce((acc, field) => {
      acc[field.field_name] = '';
      return acc;
    }, {})
  );

  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = downloadableFormValidation(fields, formFields);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Your fetch request here
        setIsSent(true);
        setMessage(successMessage);
      } catch (error) {
        setIsSent(false);
        setMessage(errorMessage);
      }
    }
  };

  return (
    <>
      {!message ? (
        <form onSubmit={handleSubmit} className="flex flex-col">
          {fields.map((field, index) => (
            <TextInput
              key={index}
              type={'text'}
              placeholder={field.placeholder}
              name={field.field_name}
              value={formFields[field.field_name]}
              onChange={handleChange}
              errorMessage={formErrors[field.field_name]}
              otherClassnames="mb-16"
            />
          ))}
          <Button CTA={buttonCta} type="submit" size="reg" disabled={isSent} />
        </form>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-3xl m-0">{message}</p>
        </div>
      )}
    </>
  );
};

export default DownloadableForm;
