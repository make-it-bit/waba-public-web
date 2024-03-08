'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container">
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <div className="flex flex-col items-center text-center mt-64">
            <h2 className="mb-16">Error!</h2>
            <p>Something went wrong.</p>
            <button onClick={() => reset()} className="underline">
              TRY AGAIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
