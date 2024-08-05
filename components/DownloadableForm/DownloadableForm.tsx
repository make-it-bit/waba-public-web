'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { TextInput, Button, Checkbox } from '@/gui-components/client';

import { downloadableFormValidation } from '@/utils/formValidation';

const DownloadableForm = ({ form, buttonCta }) => {
  const { success_message: successMessage, error_message: errorMessage, fields, terms_label: termsLabel } = form;
  const [terms, setTerms] = useState(false);
  const [termsError, setTermsError] = useState('');
  const pathname = usePathname();
  const slug = pathname.split('/').pop();
  const emailFieldName = fields.find((field) => field.validation_type === 'email').field_name;

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

  console.log(formFields);

  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTermsError('');
    setFormErrors(
      fields.reduce((acc, field) => {
        acc[field.field_name] = '';
        return acc;
      })
    );
    if (!terms) {
      setTermsError(form.terms_error);
    }
    const validationErrors = downloadableFormValidation(fields, formFields);

    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsSent(true);
        formFields.slug = slug;
        const response = await fetch('/api/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formFields[emailFieldName] }),
        });
        const { message } = await response.json();

        if (message !== 'success') {
          setIsSent(false);
          setFormErrors({ ...formErrors, [emailFieldName]: form.email_invalid_error });
          return;
        }
        await fetch('/api/spreadsheets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ form: formFields, pathname: '/offers' }),
        });
        setIsSent(true);
        setMessage(successMessage);
      } catch (error) {
        setIsSent(false);
        setMessage(errorMessage);
      }
    }
  };

  return (
    <div className="grid grid-cols-12">
      <div className="lg:col-start-3 lg:col-span-8 col-span-12">
        {!message ? (
          <form onSubmit={handleSubmit} className="flex flex-col">
            {fields.map((field, index) => (
              <TextInput
                key={index}
                theme="light"
                type={'text'}
                placeholder={field.placeholder}
                name={field.field_name}
                value={formFields[field.field_name]}
                onChange={handleChange}
                errorMessage={formErrors[field.field_name]}
                otherClassnames="mb-16"
              />
            ))}
            <Checkbox
              name="terms"
              size="reg"
              layout="vertical"
              label={termsLabel}
              value={terms}
              onChange={() => setTerms(!terms)}
              labelColor="text-white-100"
            />
            {termsError && <p className="text-sm text-signal-red-100 m-0">{termsError}</p>}
            <Button
              CTA={buttonCta}
              type="submit"
              size="reg"
              style="tertiary"
              otherClassnames="mt-16"
              disabled={isSent}
            />
          </form>
        ) : (
          <div className="flex justify-center items-center relative">
            <p className="text-3xl text-white-100 m-0">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadableForm;
