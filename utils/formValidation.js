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
