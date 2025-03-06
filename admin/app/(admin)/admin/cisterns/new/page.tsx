import Container from "@/components/Container";
import BackButton from "@/components/ui/BackButton";
import { Group } from "@mantine/core";
import Create from "./create";
import { state_list } from "../../states/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

export default async function NewPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["state_list"],
    queryFn: () => state_list({ size: 30 }),
  });

  return (
    <Container size="xl">
      <Group justify="space-between" mb={"md"}>
        <h2 className="text-2xl font-semibold">Nova Cisterna</h2>
        <BackButton />
      </Group>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Carregando</p>}>
          <Create />
        </Suspense>
      </HydrationBoundary>
    </Container>
  );
}
