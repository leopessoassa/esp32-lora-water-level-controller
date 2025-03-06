"use client";

import { Button } from "@mantine/core";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface IProps {
  label?: string;
  iconSize?: number;
}

export default function NewButton({ label = "Novo", iconSize = 14 }: IProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Button
      leftSection={<Plus size={iconSize} />}
      variant="default"
      onClick={() => router.push(`${pathname}/new`)}
    >
      {label}
    </Button>
  );
}
