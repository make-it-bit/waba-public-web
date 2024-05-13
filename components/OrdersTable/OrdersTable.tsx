'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { GetAuthenticatedUser } from '@/lib/auth';

const OrdersTable = () => {
  const user = GetAuthenticatedUser();
  const ordersDataColumns = ['Order no.', 'Date', 'Customer', 'Total', 'Status', 'Action'];
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const response = await fetch(`/api/orders/user/${user.uid}`);
        const { data } = await response.json();
        if (data) setOrders(data);
      }
    };

    fetchData();
  }, [user !== null && user !== false]);

  return orders.length === 0 ? (
    <div className="flex flex-col items-center gap-12">
      <p className="font-rufina text-2xl leading-2xl">There is no order history.</p>
      <Link href="/product" className="underline">
        {`Start shopping >`}
      </Link>
    </div>
  ) : (
    <>
      <div className="flex gap-16 border-b border-black-100">
        {ordersDataColumns.map((column, index) => (
          <div key={index} className="w-1/6 my-16 text-center text-base leading-base font-bold">
            {column}
          </div>
        ))}
      </div>
      {orders.map((row, index) => (
        <div key={index} className="flex items-center gap-16">
          <div className="w-1/6 text-center my-8">{row.orderNumber}</div>
          <div className="w-1/6 text-center my-8">{row.date}</div>
          <div className="w-1/6 text-center my-8">{row.customer}</div>
          <div className="w-1/6 text-center my-8">{`${row.price} €`}</div>
          <div className="w-1/6 text-center my-8">{row.status}</div>
          <div className="w-1/6 text-center my-8">
            <Link href={row.orderPdf} className="underline">
              {`View order >`}
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrdersTable;
