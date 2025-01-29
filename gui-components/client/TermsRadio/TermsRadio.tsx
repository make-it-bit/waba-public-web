'use client';

import Link from "next/link";

export interface PaymentRadioProps {
  disabled?: boolean;
  id: string;
  name: string;
  value: string;
  onChange?: (value: string) => void;
  checked?: boolean;
}

const TermsRadio = ({ disabled, id, name, value, onChange, checked }: PaymentRadioProps) => (
  <div>
    <div className="flex gap-2 items-center mt-[25px]">
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
      <label htmlFor={id} className="text-start hover:cursor-pointer ml-[10px] flex flex-row items-center gap-2">
        <div>
          <p className="text-sm"> 
            I have read and agree with all the 
            <Link href="/terms">
              <span className="underline ml-[5px]">Terms of Use</span>
            </Link> and  
            <Link href="/privacy-policy">
              <span className="underline ml-[5px]">Privacy Policy</span>
            </Link>
          </p>
        </div>
      </label>
    </div>
  </div>
);

export default TermsRadio;
