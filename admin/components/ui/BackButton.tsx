"use client";

import { Button } from "@mantine/core";
import { Undo } from "lucide-react";
import { useRouter } from "next/navigation";

interface IProps {
  label?: string;
  iconSize?: number;
}

export default function BackButton({
  label = "Voltar",
  iconSize = 14,
}: IProps) {
  const router = useRouter();

  return (
    <Button
      leftSection={<Undo size={iconSize} />}
      variant="default"
      onClick={() => router.back()}
    >
      {label}
    </Button>
  );
}
