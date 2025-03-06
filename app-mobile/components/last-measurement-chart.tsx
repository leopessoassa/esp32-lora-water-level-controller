import BarCharts from "@/components/bar-charts";
import { CisternResponse } from "@/models/api";
import { sumary_last_measurement } from "@/services/sumary.services";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import { ActivityIndicator } from "react-native-paper";

interface IProps {
  cistern?: CisternResponse;
  refreshing: boolean;
}

export default function LastMeasurementChart({ cistern, refreshing }: IProps) {
  const [dataLastDays, setDataLastDays] = useState<ChartData>();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sumary_last_measurement", cistern?.qrCode],
    queryFn: () => sumary_last_measurement(cistern!.qrCode),
    enabled: cistern !== undefined,
  });

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing]);

  useEffect(() => {
    if (!!data) {
      const labels: string[] = [];
      const datasets: number[] = [];
      data.reverse();
      data.forEach((el) => {
        var d = moment(el.date, "YYYY-MM-DD");
        labels.push(d.format("DD/MM"));
        datasets.push(el.average);
      });

      setDataLastDays({
        labels,
        datasets: [
          {
            data: datasets,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          },
        ],
      });
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <BarCharts title="Média Últimos Dias" data={dataLastDays} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
});
