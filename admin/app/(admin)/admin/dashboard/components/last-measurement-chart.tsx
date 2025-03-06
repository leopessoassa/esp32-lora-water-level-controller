"use client"
import Loading from "@/components/loading";
import { BarChart } from "@mantine/charts";
import { useQuery } from "@tanstack/react-query";
import { View } from "lucide-react";
import { sumary_last_measurement } from "../actions";
import { useEffect, useState } from "react";
import moment from "moment";

export default function LastMeasurementChart({}){
  const [dataLastDays, setDataLastDays] = useState<Record<string, any>[]>();
  const qrCode = "123456782";
  const { data, isLoading } = useQuery({
    queryKey: ["sumary_last_measurement", qrCode],
    queryFn: () => sumary_last_measurement(qrCode),
    enabled: qrCode !== undefined,
  });

  useEffect(() => {
    if (!!data) {
      data.reverse();
      const dataFormatted = data.map((el) => {
        var d = moment(el.date, "YYYY-MM-DD");
        el.date = d.format("DD/MM");
        return el;
      });

      setDataLastDays(dataFormatted);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <View>
          <Loading />
        </View>
      ) : (
        <BarChart
          h={300}
          data={dataLastDays || []}
          dataKey="date"
          series={[
            { name: 'average', color: 'violet.6' },
          ]}
          tickLine="y"
        />
      )}
    </>
  );

    
}