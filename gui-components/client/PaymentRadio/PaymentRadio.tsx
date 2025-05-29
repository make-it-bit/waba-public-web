'use client';

import { ReactSVG } from "react-svg";

export enum PaymentRadioEnum {
  STRIPE = 'stripe',
  KLARNA = 'klarna',
  MAKSEKESKUS = 'maksekeskus',
  MODENA = 'modena'
}

export interface PaymentRadioProps {
  disabled?: boolean;
  id: string;
  label: string;
  name: string;
  value: string;
  onChange?: (value: string) => void;
  checked?: boolean;
  type: PaymentRadioEnum;
}

const paymentLogos = [
  'visa',
  'mc',
  'amex',
  'discover',
  'apple',
  'gpay',
  'revolutpay'
];

const PaymentRadio = ({ disabled, id, label, name, value, onChange, checked, type }: PaymentRadioProps) => (
  <div>
    <div className={`flex gap-2 items-center mt-[25px] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <div className="grid place-items-center">
        <input
          type="radio"
          id={id}
          name={name}
          disabled={disabled}
          checked={checked}
          className="
            peer
            col-start-1 row-start-1
            appearance-none shrink-0
            w-[20px] h-[20px] border-2 border-black-100 rounded-[10px]
            focus:outline-none focus:ring-0 focus:ring-offset-0
            disabled:border-gray-400
            cursor-pointer
          "
          onChange={() => onChange?.(value)}
          value={value}
        />
        <div className="pointer-events-none col-start-1 row-start-1 w-[10px] h-[10px] rounded-[10px] peer-checked:bg-[#9747FF] peer-checked:peer-disabled:bg-gray-400" />
      </div>
      <label
        htmlFor={id}
        className={`text-start ml-[10px] flex flex-row items-center gap-2 ${
          disabled ? 'text-gray-400' : ''
        }`}
      >
        <div>
          {label}
        </div>
        {type === PaymentRadioEnum.STRIPE && (
          <div className="ml-[5px]">
            <ReactSVG src="logos/stripe.svg" className="block" />
          </div>
        )}
        {type === PaymentRadioEnum.KLARNA && (
          <div className="ml-[5px]">
            <ReactSVG src="logos/klarna.svg" className="block" />
          </div>
        )}
        {type === PaymentRadioEnum.MAKSEKESKUS && (
          <div className="ml-[5px]">
            <ReactSVG src="logos/maksekeskus.svg" className="block" />
          </div>
        )}
        {type === PaymentRadioEnum.MODENA && (
          <div className="ml-[5px]">
            <ReactSVG src="logos/modena.svg" className="block" style={{ width: '80px' }} />
          </div>
        )}
      </label>
    </div>
    {type === PaymentRadioEnum.STRIPE && (
      <div className="flex flex-row justify-start pl-[30px] mt-[10px]">
        <div className="flex flex-col gap-y-[5px]">
          <div className="flex flex-row gap-4 justify-start">
            {paymentLogos.slice(0, 4).map((name) => (
              <ReactSVG key={name} src={`logos/${name}.svg`} className="block w-full h-auto" />
            ))}
          </div>
          <div className="flex flex-row gap-4 justify-start">
            {paymentLogos.slice(4).map((name) => (
              <ReactSVG key={name} src={`logos/${name}.svg`} className="block w-full h-auto" />
            ))}
          </div>
        </div>
      </div>
    )}
    {type === PaymentRadioEnum.KLARNA && (
      <div className="flex flex-row justify-start pl-[30px] mt-[10px]">
        <p
          className={`text-sm ${
            disabled ? 'text-gray-400' : ''
          }`} 
        >
          Sweden, Norway, Finland, Denmark, Germany, Austria, the Netherlands, Belgium, Switzerland, Great Britain.
        </p>
      </div>
    )}
    {type === PaymentRadioEnum.MAKSEKESKUS && (
      <div className="flex flex-row justify-start pl-[30px] mt-[10px]">
        <p
          className={`text-sm ${
            disabled ? 'text-gray-400' : ''
          }`} 
        >
          Estonia, Latvia, Lithuania.
        </p>
      </div>
    )}
    {type === PaymentRadioEnum.MODENA && (
      <div className="flex flex-row justify-start pl-[30px] mt-[10px]">
        <p
          className={`text-sm ${
            disabled ? 'text-gray-400' : ''
          }`}
        >
          Pay in 3 installments. Available in Estonia, Latvia, and Lithuania.
        </p>
      </div>
    )}
  </div>
);

export default PaymentRadio;
