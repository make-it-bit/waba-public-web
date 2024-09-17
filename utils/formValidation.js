import { getCountryCode } from 'countries-list';
import { PaymentMethodEnum } from '@/lib/enums';

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGEX = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{5,9}$/;

export const formValidation = (form, setMessage) => {
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
  if (!EMAIL_REGEX.test(form.email)) {
    setMessage('Please enter a valid email address.');
    return false;
  }
  if (form.number === '') {
    setMessage('Please enter your phone number.');
    return false;
  }
  if (!PHONE_REGEX.test(form.number)) {
    setMessage('Please enter a valid phone number.');
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

  fields.forEach((field) => {
    if (!formFields[field.field_name] && field.required) {
      errors[field.field_name] = field.field_error;
    }
    if (
      formFields[field.field_name] !== '' &&
      field.validation_type === 'phone' &&
      !PHONE_REGEX.test(formFields[field.field_name])
    ) {
      errors[field.field_name] = field.field_error;
    }
  });
  return errors;
};

export const paymentFormValidation = (form, paymentMethod) => {
  let errors = {};

  if (form.quantity === 0) errors.quantity = 'Please enter a quantity.';
  if (paymentMethod === PaymentMethodEnum.BNPL && !form.period) errors.period = 'Please select a period.';
  if (form.firstName === '') errors.firstName = 'Please enter your first name.';
  if (form.lastName === '') errors.lastName = 'Please enter your last name.';
  if (form.email === '') errors.email = 'Please enter your email address.';
  if (!EMAIL_REGEX.test(form.email)) errors.email = 'Please enter a valid email address.';
  if (form.address === '') errors.address = 'Please enter your address.';
  if (form.city === '') errors.city = 'Please enter your city.';
  if (form.region === '') errors.region = 'Please enter your region.';
  if (form.country === '') errors.country = 'Please enter your country.';
  if (!getCountryCode(form.country)) errors.country = 'Please enter a valid country.';
  if (form.postalCode === '') errors.postalCode = 'Please enter your postal code.';

  return errors;
};

export const payingInPartsValidation = (grandTotal, paymentMethod, period) => {
  if (paymentMethod === 'hirePurchase' /* PaymentMethodEnum.HIRE_PURCHASE */) {
    if (grandTotal < 100) return 'Minimum order amount for Hire Purchase is 100 €.';
    if (grandTotal > 10000) return 'Maximum order amount for Hire Purchase is 10 000 €.';
  }
  if (paymentMethod === 'bnpl' /* PaymentMethodEnum.BNPL */) {
    if (period === 1) {
      if (grandTotal < 30) return 'Minimum order amount for Buy Now Pay Later (next month) is 30 €.';
      if (grandTotal > 800) return 'Maximum order amount for Buy Now Pay Later (next month) is 800 €.';
    }
    if (period === 2 || period === 3) {
      if (grandTotal < 75) return `Minimum order amount for Buy Now Pay Later (${period} parts) is 75 €.`;
      if (grandTotal > 2500) return `Maximum order amount for Buy Now Pay Later (${period} parts) is 2 500 €.`;
    }
  }
  return '';
};
