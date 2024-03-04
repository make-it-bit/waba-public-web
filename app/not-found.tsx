import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container">
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <div className="flex flex-col items-center text-center mt-64">
            <h2 className="mb-16">Not Found!</h2>
            <p>Could not find requested resource.</p>
            <Link href="/" className="underline">
              RETURN TO HOMEPAGE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
