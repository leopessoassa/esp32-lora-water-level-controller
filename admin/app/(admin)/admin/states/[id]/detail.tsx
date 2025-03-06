"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { state_detail } from "../actions";
import { Table } from "@mantine/core";

export default function Detail({ id }: { id: number }) {
  const { data, isPending } = useSuspenseQuery({
    queryKey: ["state_detail", id],
    queryFn: () => state_detail(id),
  });

  if (isPending) {
    return "<p>Carregando dados</p>";
  }

  if (!data) {
    return "<p>Sem dados</p>";
  }

  return (
    <Table variant="vertical" layout="fixed" withTableBorder>
      <Table.Tbody>
        <Table.Tr>
          <Table.Th w={160}>ID</Table.Th>
          <Table.Td>{data.id}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th>Nome</Table.Th>
          <Table.Td>{data.name}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th>UF</Table.Th>
          <Table.Td>{data.uf}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th>Criado em</Table.Th>
          <Table.Td>{data.createdAt.toString()}</Table.Td>
        </Table.Tr>

        <Table.Tr>
          <Table.Th>Atualizado em</Table.Th>
          <Table.Td>{data.updatedAt.toString()}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
