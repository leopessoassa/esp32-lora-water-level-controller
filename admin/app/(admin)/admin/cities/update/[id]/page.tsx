import Container from "@/components/Container";
import { Group } from "@mantine/core";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { city_detail } from "../../actions";
import Update from "./update";
import BackButton from "@/components/ui/BackButton";

export default async function UpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["city_detail", id],
    queryFn: () => city_detail(+id),
  });

  return (
    <Container size="xl">
      <Group justify="space-between" mb={"md"}>
        <h2 className="text-2xl font-semibold">Detalhe do Estados</h2>
        <BackButton />
      </Group>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Carregando</p>}>
          <Update id={+id} />
        </Suspense>
      </HydrationBoundary>
    </Container>
  );
}
