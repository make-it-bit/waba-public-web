'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const AddToWishlist = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // TODO: implement add to wishlist functionality
  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // TODO: implement remove from wishlist functionality
  const handleRemoveFromWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <>
      {isWishlisted ? (
        <Image
          src="/icons/heart-filled.svg"
          width={34.88}
          height={32}
          alt="empty heart icon"
          className="cursor-pointer"
          onClick={handleAddToWishlist}
        />
      ) : (
        <Image
          src="/icons/heart-empty.svg"
          width={34.88}
          height={32}
          alt="empty heart icon"
          className="cursor-pointer"
          onClick={handleRemoveFromWishlist}
        />
      )}
    </>
  );
};

export default AddToWishlist;
