"use client";

import { Button } from "@mantine/core";
import { Eye } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  id: number;
  label?: string;
  iconSize?: number;
  buttonVariant?: string;
}

export default function ViewButton({
  id,
  label,
  iconSize = 20,
  buttonVariant = "transparent",
}: IProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Button
      variant={buttonVariant}
      onClick={() => router.push(`${pathname}/${id}`)}
    >
      <Eye size={iconSize} /> {label}
    </Button>
  );
}
