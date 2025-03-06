"use client";

import { Check, Trash, X } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";
import { UseMutationResult } from "@tanstack/react-query";

interface IProps {
  id: number;
  label?: string;
  iconSize?: number;
  buttonVariant?: string;
  onDelete?: UseMutationResult<any, Error, any, unknown>;
}

export default function DeleteButton({
  id,
  label,
  iconSize = 20,
  buttonVariant = "transparent",
  onDelete,
}: IProps) {
  const [opened, { open, close }] = useDisclosure(false);

  function handlerOnConfirm() {
    onDelete?.mutate(id, {
      onSuccess: () => {
        close();
      },
    });
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Confirmar remoção"
        centered
        size={"md"}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <p>Você realmente deseja remover o item?</p>
        <Group justify="center" className="mt-4">
          <Button
            leftSection={<Check size={iconSize} />}
            variant="filled"
            color="green"
            radius="md"
            onClick={() => handlerOnConfirm()}
          >
            Confirmar
          </Button>
          <Button
            leftSection={<X size={iconSize} />}
            variant="filled"
            color="red"
            radius="md"
            onClick={close}
          >
            Cancelar
          </Button>
        </Group>
      </Modal>

      <Button variant={buttonVariant} onClick={open}>
        <Trash size={iconSize} /> {label}
      </Button>
    </>
  );
}
