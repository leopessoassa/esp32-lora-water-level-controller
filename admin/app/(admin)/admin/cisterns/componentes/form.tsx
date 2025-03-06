import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, TextInput } from "@mantine/core";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { state_list } from "../../states/actions";
import { city_list } from "../../cities/actions";
import { Select } from "@/components/form/Select";
import { owner_list } from "../../owners/actions";

const formSchema = z.object({
  qrCode: z
    .string()
    .nonempty("Campo obrigatório")
    .min(3, "Precisa de ter ao menos 3 caracteres"),
  type: z.string().nonempty("Campo obrigatório"),
  stateId: z.string().nonempty("Campo obrigatório"),
  cityId: z.string().nonempty("Campo obrigatório"),
  ownerId: z.string().nonempty("Campo obrigatório"),
});

type formSchemaType = z.infer<typeof formSchema>;

interface IProps<T> {
  data?: T;
  isPending?: boolean;
  buttonLabel?: string;
  onSubmit(data: T): void;
}

export default function FormModel({
  data = {},
  isPending = false,
  buttonLabel = "Salvar",
  onSubmit,
}: IProps<any>) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<formSchemaType>({
    defaultValues: {
      qrCode: data?.qrCode,
      type: data?.type?.toString(),
      stateId: data?.state?.id?.toString(),
      cityId: data?.city?.Id?.toString(),
      ownerId: data?.owner?.id?.toString(),
    },
    resolver: zodResolver(formSchema),
  });

  const { data: dataState, isPending: isPendingState } = useSuspenseQuery({
    queryKey: ["state_list"],
    queryFn: () => state_list({ size: 30 }),
  });

  if (isPendingState) {
    return "<p>Carregando dados</p>";
  }

  const selectedState = watch("stateId")
    ? dataState.data.find(
        (el) => el.id.toString() === watch("stateId")?.toString()
      )
    : undefined;

  const { data: dataCity } = useQuery({
    queryKey: ["city_list"],
    queryFn: () => city_list({ uf: selectedState?.uf }),
    enabled: !!dataState && !!selectedState,
  });

  const { data: dataOwner } = useQuery({
    queryKey: ["owner_list"],
    queryFn: () => owner_list({})
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 w-full max-w-xs"
    >
      <div className="flex flex-col gap-1">
        <TextInput
          radius="md"
          type="text"
          label="QR Code"
          aria-label="QR Code da cisterna"
          error={errors.qrCode?.message}
          {...register("qrCode")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Select
          label="Tipo"
          checkIconPosition="right"
          allowDeselect
          searchable
          nothingFoundMessage="Não encontrado..."
          mt="md"
          defaultValue={data?.type?.toString()}
          data={["ALVENARIA", "POLIPROPILENO", "PEDRA"]}
          error={errors.type?.message}
          name="type"
          control={control}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Select
          label="Estado"
          checkIconPosition="right"
          allowDeselect
          searchable
          nothingFoundMessage="Não encontrado..."
          mt="md"
          data={dataState.data.map((el) => ({
            value: el.id.toString(),
            label: el.name,
          }))}
          defaultValue={data?.state?.id?.toString()}
          error={errors.stateId?.message}
          name="stateId"
          control={control}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Select
          label="Cidade"
          checkIconPosition="right"
          allowDeselect
          searchable
          nothingFoundMessage="Não encontrado..."
          mt="md"
          data={dataCity?.data.map((el) => ({
            value: el.id.toString(),
            label: el.name,
          }))}
          defaultValue={data?.city?.id?.toString()}
          error={errors.cityId?.message}
          name="cityId"
          control={control}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Select
          label="Dono da cisterna"
          checkIconPosition="right"
          allowDeselect
          searchable
          nothingFoundMessage="Não encontrado..."
          mt="md"
          data={dataOwner?.data.map((el) => ({
            value: el.id.toString(),
            label: `${el.name}, ${el.city.name}-${el.state.uf}`,
          }))}
          defaultValue={data?.owner?.id?.toString()}
          error={errors.ownerId?.message}
          name="ownerId"
          control={control}
        />
      </div>

      <Button
        type="submit"
        className="w-full mt-2"
        disabled={isPending || isPendingState}
      >
        {buttonLabel}
      </Button>
    </form>
  );
}
