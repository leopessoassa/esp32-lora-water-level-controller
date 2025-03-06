"use client";

import { Button } from "@mantine/core";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function GlobalError() {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Acorreu algum erro!</h2>
          <Button
            variant="filled"
            color="indigo"
            size="md"
            onClick={() => {
              window.location.reload();
            }}
          >
            Tentar novamente
          </Button>
        </div>
      </body>
    </html>
  );
}
