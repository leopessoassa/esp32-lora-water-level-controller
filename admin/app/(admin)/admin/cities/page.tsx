import { city_list } from "./actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Container from "@/components/Container";
import { Group } from "@mantine/core";
import { Suspense } from "react";
import List from "./list";
import NewButton from "@/components/ui/NewButton";
import { parseSearchParams } from "@/lib/utils";

export default async function ListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsValues = await searchParams;
  const search = parseSearchParams(searchParamsValues, [
    "name",
    "uf",
    "isCapital",
  ]);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["city_list", ...search.queryKeys],
    queryFn: () => city_list(search.params),
  });

  return (
    <Container size="xl">
      <Group justify="space-between" mb={"md"}>
        <h2 className="text-2xl font-semibold">Lista de Cidades</h2>
        <NewButton />
      </Group>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Carregando</p>}>
          <List queryKeys={search.queryKeys} params={search.params} />
        </Suspense>
      </HydrationBoundary>
    </Container>
  );
}
