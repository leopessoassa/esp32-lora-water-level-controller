import { CisternResponse } from "@/models/api";
import { sumary_last } from "@/services/sumary.services";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Avatar, Card, Text } from "react-native-paper";

interface IProps {
  cistern?: CisternResponse;
  refreshing: boolean;
}

export default function LastInfo({ cistern, refreshing }: IProps) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sumary_last", cistern?.qrCode],
    queryFn: () => sumary_last(cistern!.qrCode),
    enabled: cistern !== undefined,
  });

  useEffect(() => {
    //console.log('[LastInfo] useEffect (0)');
    if (refreshing) {
      //console.log('[LastInfo] useEffect (1)');
      refetch();
    }
  }, [refreshing]);

  const getDateFormatted = () => {
    var d = moment(data?.date, "YYYY-MM-DD");
    return d.format("DD/MM/YYYY");
  };

  const getAverageFormatted = () => {
    return data?.average.toFixed(2);
  };

  const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <>
          <Card style={styles.cardContainer}>
            <Card.Title title="Nível de Água Atual" titleStyle={styles.title} />
            <Card.Cover
              source={{
                uri: "https://www.gov.br/mds/pt-br/noticias-e-conteudos/desenvolvimento-social/noticias-desenvolvimento-social/no-dia-mundial-da-agua-mds-alerta-para-importancia-do-cuidado-com-as-cisternas/cats.jpg/@@images/8061bab2-f149-4d5f-b359-a7186784d1b9.jpeg",
              }}
            />
            <Card.Content>
              <Text variant="bodyMedium">{`${getDateFormatted()} às ${
                data?.time
              }`}</Text>
              <Text variant="bodyMedium">{`Nível: ${getAverageFormatted()}%`}</Text>
            </Card.Content>
          </Card>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  cardContainer: {
    width: "90%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
