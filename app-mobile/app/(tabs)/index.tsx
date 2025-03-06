import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, TextInput } from "react-native-paper";
import { cistern_find } from "@/services/actions";
import { CisternResponse } from "@/models/api";

const formSchema = z.object({
  qrCode: z
    .string()
    .nonempty("Campo obrigatório")
    .min(3, "Precisa de ter ao menos 3 caracteres"),
});
type FormSchemaType = z.infer<typeof formSchema>;

export default function Index() {
  const [qrCode, setQrCode] = useState<undefined | string>(undefined);
  const storage = useAsyncStorage("qrcode-transmissor");
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormSchemaType>({
    defaultValues: {
      qrCode,
    },
    resolver: zodResolver(formSchema),
  });

  const {isPending, mutateAsync} = useMutation({
    mutationFn: (code: string) => cistern_find(code)
  });

  useEffect(() => {
    storage.removeItem();
    storage.getItem((_, result) => {
      let _qrCode = "";
      if (!!result){
        const cistern = JSON.parse(result) as CisternResponse;
        _qrCode = cistern.qrCode;
        setValue("qrCode", _qrCode);
      }
      setQrCode(_qrCode);
    });
  }, []);

  useEffect(() => {
    getCistern(qrCode || "");
  }, [qrCode]);

  async function getCistern(code:string) {
    if (code !== undefined && code !== "") {
      let response = await mutateAsync(code);
      if (!response) {
        setError("qrCode", {message: "Cisterna inválida", type: "required"});
        storage.removeItem();
      }
      else {
        storage.setItem(JSON.stringify(response)).then(() => {
          router.navigate('/(tabs)/about');
        });
      }
    }
  }

  const onSubmit: SubmitHandler<FormSchemaType> = (data: FormSchemaType) => {
    getCistern(data.qrCode);
  };

  if (qrCode === undefined)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projeto TCC</Text>
      <Text style={styles.text}>Leonardo Pessoa</Text>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <View>
              <TextInput
                mode="outlined"
                label="Qr Code"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                activeOutlineColor={error ? "red" : "#13a055"}
                keyboardType="number-pad"
                style={styles.input}
                disabled={isPending}
              />
            </View>
          )}
          name="qrCode"
        />
        {errors.qrCode && (
          <Text style={{ color: "#ff8566" }}>{errors.qrCode.message}</Text>
        )}
        <Button
          icon="antenna"
          mode="elevated"
          onPress={handleSubmit(onSubmit)}
          loading={qrCode != "" && isPending}
        >
          Enviar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
  title: {
    color: "#fff",
    fontSize: 22,
  },
  linkButton: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
  button: {
    color: "#fff",
    borderColor: "#fff",
  },
  formContainer: {
    width: "100%",
    justifyContent: "center",
    marginVertical: 10,
    padding: 8,
  },
  input: {
    marginVertical: 10,
  },
});
