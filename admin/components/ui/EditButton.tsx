"use client";

import { Button } from "@mantine/core";
import { Pencil } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  id: number;
  label?: string;
  iconSize?: number;
  buttonVariant?: string;
}

export default function EditButton({
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
      onClick={() => router.push(`${pathname}/update/${id}`)}
    >
      <Pencil size={iconSize} /> {label}
    </Button>
  );
}
