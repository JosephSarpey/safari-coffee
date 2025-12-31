"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center p-4">
      <AlertCircle className="h-20 w-20 text-red-500 mb-6" />
      <h2 className="text-3xl text-white font-black uppercase tracking-widest mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-400 max-w-md mb-8">
        We encountered an unexpected error while exploring.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="btn-primary"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.href = "/"}
          className="px-8 py-4 border border-zinc-800 text-white uppercase font-bold text-sm tracking-widest hover:bg-zinc-800 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
