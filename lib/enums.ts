export enum PaymentMethodEnum {
  PAYMENT_INITIATION = 'paymentInitiation',
  CARD_PAYMENTS = 'cardPayments',
  HIRE_PURCHASE = 'hirePurchase',
  BNPL = 'bnpl',
}

export enum OrderStatusEnum {
  NOT_STARTED = 'NOT STARTED',
  PENDING = 'PENDING',
  PAID = 'PAID',
  VOIDED = 'VOIDED',
  PARTIALLY_REFUNDED = 'PARTIALLY REFUNDED',
  REFUNDED = 'REFUNDED',
  ABANDONED = 'ABANDONED',
}
