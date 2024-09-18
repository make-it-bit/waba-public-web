export type PaymentForm = {
  quantity: number;
  period: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
};

export type PaymentFormErrors = {
  quantity?: string;
  period?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
};
