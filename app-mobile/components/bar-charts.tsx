import { Dimensions, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { Text } from "react-native-paper";

interface IProps {
  title: string;
  data?: ChartData;
}

export default function BarCharts({ title, data }: IProps) {
  const width = Dimensions.get("window").width;
  const height = 220;

  const labelStyle = {
    color: "#000000",
    marginVertical: 10,
    textAlign: "center",
    fontSize: 16,
  };
  const graphStyle = {
    marginVertical: 8,
    borderRadius: 16,
  };

  const chartConfig = {
    backgroundColor: "#000000",
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <>
      <Text style={styles.text}>{title}</Text>
      {data ? (
        <BarChart
          width={width}
          height={height}
          data={data}
          chartConfig={chartConfig}
          style={graphStyle}
        />
      ) : (
        <Text style={styles.text}>Não foi possível recuperar os dados</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
});
