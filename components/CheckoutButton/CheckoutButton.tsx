'use client';

import React from 'react';

import { Button } from '@/gui-components/client';

const CheckoutButton = ({ CTA, style = 'primary' }: { CTA: string; style?: 'primary' | 'tertiary' }) => {
  return <Button CTA={CTA} style={style} svg />;
};

export default CheckoutButton;
