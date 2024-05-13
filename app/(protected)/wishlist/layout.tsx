'use client';

import React from 'react';
import { redirect } from 'next/navigation';

import { GetAuthenticatedUser } from '@/lib/auth';

import { SideNavbar } from '@/page-components';

import '../../_globals.scss';
import styles from '../_layout.module.scss';

export const dynamic = 'force-dynamic';

export default function ProtectedLayout({ children }) {
  const user = GetAuthenticatedUser();

  if (user === null) redirect('/auth');

  return (
    <div className={styles.background}>
      <div className="container my-160">
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <SideNavbar />
          </div>
          <div className="col-start-6 col-span-7">
            {user ? (
              children
            ) : (
              <div className={styles.background}>
                <div className="container my-160">
                  <div className="flex justify-center">
                    <p className="font-rufina text-2xl leading-2xl">LOADING...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
