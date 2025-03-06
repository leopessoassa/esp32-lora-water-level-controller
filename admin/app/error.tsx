"use client";

import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  function handleReset() {
    startTransition(() => {
      reset();
      router.refresh();
    })
  }

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full mt-4 flex flex-col justify-center items-center">
      <h2 className="text-2xl mb-4">Something went wrong!</h2>
      <p>{error.message}</p>
      <Button onClick={handleReset}>Try again</Button>
    </div>
  );
}
