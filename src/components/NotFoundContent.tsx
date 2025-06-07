"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

function ClientNotFoundContent() {
  const searchParams = useSearchParams();
  const [referrer, setReferrer] = useState<string | null>(null);

  useEffect(() => {
    setReferrer(searchParams.get("from"));
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-8 mt-6">
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-medium text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>

          {referrer && (
            <p className="text-sm text-gray-500 mb-4">
              Redirected from: {referrer}
            </p>
          )}

          <Link
            href="/"
            className="px-6 py-3 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
}

export function NotFoundContent() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <ClientNotFoundContent />
    </Suspense>
  );
}
