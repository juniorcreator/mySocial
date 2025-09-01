"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center text-center justify-center h-full">
      <h2 className="mb-3">Something went wrong! 🥺</h2>
      <Button
        className="cursor-pointer"
        onClick={() => {
          // Attempt to recover by trying to re-render the segment
          router.push("/");
          // () => reset()
        }}
      >
        Try again
      </Button>
    </div>
  );
}
