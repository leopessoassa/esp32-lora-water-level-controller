import Container from "@/components/Container";
import BackButton from "@/components/ui/BackButton";
import { Group } from "@mantine/core";
import Create from "./create";

export default async function NewPage() {
  return (
    <Container size="xl">
      <Group justify="space-between" mb={"md"}>
        <h2 className="text-2xl font-semibold">Novo Estado</h2>
        <BackButton />
      </Group>
      <Create />
    </Container>
  );
}
