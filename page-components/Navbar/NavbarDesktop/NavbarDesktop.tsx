'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

import { getImageFullUrl_client } from '@/lib/getImgFullUrl';

import { Button } from '@/gui-components/client';
import { useCartStore } from '@/page-components/CartContent/CartContent';
import { useCurrencyStore, Currency } from '../currencyStore';
import CurrencyFlag from 'react-currency-flags';
import { Dropdown } from '@/components';

const NavbarDesktop = ({ navbarData }) => {
  const pathname = usePathname();
  const quantity = useCartStore((state) => state.quantity);
  const { currency, setCurrency } = useCurrencyStore();

  const currencies = [
    { value: 'EUR', label: 'EUR' },
    { value: 'AED', label: 'AED' },
  ];

  return (
    <div className="bg-white-100 lg:block hidden">
      <div className="container">
        <div className="relative flex justify-between items-center py-32">
          <div className="flex flex-1 items-center 2xl:gap-64 xl:gap-32 gap-16">
            {navbarData.leftside_links.data.map((link, index) => (
              <Link
                key={index}
                href={link.attributes.page_link_data.href_src}
                className={classNames(
                  'text-sm leading-sm hover:border-b hover:border-black-100 hover:mb-[-1px]',
                  pathname === link.attributes.page_link_data.href_src && 'border-b border-black-100 mb-[-1px]'
                )}
              >
                {link.attributes.page_link_data.href_text}
              </Link>
            ))}
          </div>
          <div className="flex flex-0 justify-center">
            <Link href="/">
              <Image
                src={getImageFullUrl_client(navbarData.waba_logos.data[0])}
                alt="waba logo"
                width={96}
                height={24}
                quality={100}
              />
            </Link>
          </div>
          <div className="flex flex-1 justify-end items-center 2xl:gap-64 xl:gap-32 gap-16">
            <Dropdown
              className="mr-4"
              options={currencies}
              value={currency}
              onChange={val => setCurrency(val as Currency)}
              renderOption={c => (
                <div className="flex items-center gap-1"><CurrencyFlag currency={c.value} size="sm" /> {c.value}</div>
              )}
              renderButton={selected => (
                <div className="flex items-center gap-1"><CurrencyFlag currency={selected.value} size="md" /> {selected.value}</div>
              )}
            />
            {navbarData.rightside_links.data.map((link, index) => (
              <Link
                key={index}
                href={link.attributes.page_link_data.href_src}
                className={classNames(
                  'text-sm leading-sm hover:border-b hover:border-black-100 hover:mb-[-1px]',
                  pathname === link.attributes.page_link_data.href_src && 'border-b border-black-100 mb-[-1px]'
                )}
              >
                {link.attributes.page_link_data.href_text}
                {link.attributes.page_link_data.href_text === 'Cart' && quantity > 0 && ` (${quantity})`}
              </Link>
            ))}
            <Link href={navbarData.button.href_src}>
              <Button CTA={navbarData.button.href_text} size="sm" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
