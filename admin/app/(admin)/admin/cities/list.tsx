"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { city_delete, city_list } from "./actions";
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
    queryKey: ["city_list", ...queryKeys],
    queryFn: () => city_list(params),
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
    mutationFn: (id: number) => city_delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["city_list"],
        refetchType: "all",
      });
    },
  });

  return (
    <>
      <Table
        data={data.data || []}
        attributes={[
          { label: "Nome", attribute: "name" },
          { label: "UF", attribute: "state.uf" },
          { label: "Capital", attribute: "isCapital" },
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
