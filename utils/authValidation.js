export const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const signInValidation = (form, setErrorMessage) => {
  if (form.email === '') {
    setErrorMessage('Please enter your email address.');
    return false;
  }
  if (!regex.test(form.email)) {
    setErrorMessage('Please enter a valid email address.');
    return false;
  }
  if (form.password === '') {
    setErrorMessage('Please enter your password.');
    return false;
  }
  return true;
};

export const signUpValidation = (form, setErrorMessage) => {
  if (form.firstName === '') {
    setErrorMessage('Please enter your first name.');
    return false;
  }
  if (form.lastName === '') {
    setErrorMessage('Please enter your last name.');
    return false;
  }
  if (form.email === '') {
    setErrorMessage('Please enter your email address.');
    return false;
  }
  if (!regex.test(form.email)) {
    setErrorMessage('Please enter a valid email address.');
    return false;
  }
  /* if (form.phoneNumber === '') {
    setErrorMessage('Please enter your phone number.');
    return false;
  } */
  if (form.password === '') {
    setErrorMessage('Please enter your password.');
    return false;
  }
  return true;
};
