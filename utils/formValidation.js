export const formValidation = (form, setMessage) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (form.firstName === '') {
    setMessage('Please enter your first name.');
    return false;
  }
  if (form.lastName === '') {
    setMessage('Please enter your last name.');
    return false;
  }
  if (form.email === '') {
    setMessage('Please enter your email address.');
    return false;
  }
  if (!regex.test(form.email)) {
    setMessage('Please enter a valid email address.');
    return false;
  }
  if (form.number === '') {
    setMessage('Please enter your phone number.');
    return false;
  }
  if (form.subject === '') {
    setMessage('Please enter a subject.');
    return false;
  }
  if (form.enquiry === '') {
    setMessage('Please enter your enquiry.');
    return false;
  }
  return true;
};

export const downloadableFormValidation = (fields, formFields) => {
  let errors = {};
  const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{5,9}$/;

  fields.forEach((field) => {
    if (!formFields[field.field_name] && field.required) {
      errors[field.field_name] = field.field_error;
    }
    if (
      formFields[field.field_name] !== '' &&
      field.validation_type === 'phone' &&
      !phoneRegex.test(formFields[field.field_name])
    ) {
      errors[field.field_name] = field.field_error;
    }
  });
  return errors;
};
