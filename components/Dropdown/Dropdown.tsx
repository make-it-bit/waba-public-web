'use client';

import React, { useRef, useState, useEffect } from 'react';

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  renderOption?: (option: Option) => React.ReactNode;
  renderButton?: (selected: Option) => React.ReactNode;
  className?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  renderOption,
  renderButton,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="border border-black-100 rounded px-[10px] py-[5px] text-sm text-black flex items-center gap-x-2"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div>
          {renderButton ? renderButton(selected) : selected.label}
        </div>
        {/* <div>
          <svg
            className={`size-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div> */}
      </button>
      {open && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white-100 border border-black-100 rounded shadow-lg"
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm ${value === option.value ? 'font-bold' : ''}`}
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {renderOption ? renderOption(option) : option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown; 