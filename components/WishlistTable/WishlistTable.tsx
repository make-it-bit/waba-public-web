'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getAuthenticatedUser } from '@/lib/auth';

const WishlistTable = () => {
  const user = getAuthenticatedUser();
  // TODO: set the order of the items in the wishlist
  const [wishListItems, setWishListItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const response = await fetch(`/api/wishlist/user/${user.uid}`);
        const { data } = await response.json();
        if (data) setWishListItems(data);
      }
    };

    fetchData();
  }, [user !== null && user !== false]);

  const handleClick = async (item) => {
    if (user) {
      const response = await fetch(`/api/wishlist/${item.id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        const newWishListItems = wishListItems.filter((i) => i.id !== item.id);
        setWishListItems(newWishListItems);
      }
    }
  };

  return wishListItems.length === 0 ? (
    <div className="flex flex-col items-center gap-12">
      <p className="font-rufina text-2xl leading-2xl">There are no items in wishlist.</p>
      <Link href="/product" className="underline">
        {`View products >`}
      </Link>
    </div>
  ) : (
    <div className="flex flex-col gap-16">
      {wishListItems.map((item, index) => (
        <div key={index} className="grid grid-cols-7">
          <div className="col-span-6">
            <div className="flex flex-col gap-16 bg-white-100 p-32">
              <p className="text-base leading-base">{item.title.toUpperCase()}</p>
              <p className="text-xs leading-xs">{item.description}</p>
              <p className="text-base leading-base font-bold">{item.price}</p>
            </div>
          </div>
          <div className="col-span-1 bg-black-10 cursor-pointer" onClick={() => handleClick(item)}>
            <div className="flex justify-center items-center h-full">
              <Image src="/icons/delete.svg" alt="delete" width={40} height={40} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistTable;
