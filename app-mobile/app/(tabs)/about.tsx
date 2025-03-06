import { CisternResponse } from "@/models/api";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import LastInfo from "../../components/last-info";
import LastMeasurementChart from "../../components/last-measurement-chart";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function AboutScreen() {
  const storage = useAsyncStorage("qrcode-transmissor");
  const [cistern, setCistern] = useState<CisternResponse>();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const router = useRouter();

  useEffect(() => {
    storage.getItem((_, result) => {
      if (!!result) {
        setCistern(JSON.parse(result) as CisternResponse);
      } else router.navigate("/(tabs)");
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LastInfo cistern={cistern} refreshing={refreshing} />
      <LastMeasurementChart cistern={cistern} refreshing={refreshing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
});
