import Container from "@/components/Container";
import LastMeasurementChart from "./components/last-measurement-chart";

export default async function DashboardPage() {
  return (
    <Container size="xl">
      <h1 className="w-full mt-4 mb-4 flex justify-center items-center" >Dashboard</h1>
      <LastMeasurementChart />
    </Container>
  );
}