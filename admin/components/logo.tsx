"use client";

import { useAuthGuard } from "@/lib/auth/use-auth";
import Link from "next/link";

export default function Logo() {
  const { user } = useAuthGuard({ middleware: "auth" });

  const getRedirectLink = () => {
    return user ? "/admin/dashboard" : "/";
  };

  return (
    <Link href={getRedirectLink()}>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-4 to-primary-9 inline-block text-transparent bg-clip-text">
        Leo Pessoa
      </h1>
    </Link>
  );
}
