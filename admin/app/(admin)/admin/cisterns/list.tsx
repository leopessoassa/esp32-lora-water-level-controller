"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { cistern_delete, cistern_list } from "./actions";
import { usePathname, useRouter } from "next/navigation";
import Table from "@/components/table";
import { Pagination } from "@mantine/core";

interface IProps {
  queryKeys: string[];
  params: any;
}

export default function List({ queryKeys, params }: IProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isPending } = useSuspenseQuery({
    queryKey: ["cistern_list", ...queryKeys],
    queryFn: () => cistern_list(params),
  });

  function handleChangePage(nextPage: number) {
    if (nextPage === +params.page) return;

    params.page = nextPage.toString();
    router.push(`${pathname}?${new URLSearchParams(params).toString()}`);
  }

  if (isPending) {
    return "<p>Carregando dados</p>";
  }

  if (!data || !data.data) {
    return "<p>Sem dados</p>";
  }

  const queryClient = useQueryClient();
  const deleteModel = useMutation({
    mutationFn: (id: number) => cistern_delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cistern_list"],
        refetchType: "all",
      });
    },
  });

  return (
    <>
      <Table
        data={data.data || []}
        attributes={[
          { label: "QR Code", attribute: "qrCode" },
          { label: "Tipo", attribute: "type" },
          { label: "Cidade", attribute: "city.name" },
          { label: "UF", attribute: "state.uf" },
        ]}
        onDelete={deleteModel}
      />

      <Pagination
        value={params.page ? +params.page : 1}
        total={data.totalPages}
        onChange={handleChangePage}
        className="mt-4"
      />
    </>
  );
}
