import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, TextInput } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { state_list } from "../../states/actions";
import { Select } from "@/components/form/Select";

const formSchema = z.object({
  name: z
    .string()
    .nonempty("Campo obrigatório")
    .min(3, "Precisa de ter ao menos 3 caracteres"),
  isCapital: z.string().nonempty("Campo obrigatório"),
  stateId: z.string().nonempty("Campo obrigatório"),
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
    formState: { errors },
  } = useForm<formSchemaType>({
    defaultValues: {
      name: data?.name,
      isCapital: data?.isCapital?.toString(),
      stateId: data?.state?.id?.toString(),
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-xs"
    >
      <div className="flex flex-col gap-1">
        <TextInput
          radius="md"
          type="text"
          label="Nome"
          aria-label="Nome da cidade"
          error={errors.name?.message}
          {...register("name")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Select
          label="Capital"
          checkIconPosition="right"
          allowDeselect
          searchable
          nothingFoundMessage="Não encontrado..."
          mt="md"
          data={[
            { value: "true", label: "Sim" },
            { value: "false", label: "Não" },
          ]}
          defaultValue={data?.isCapital?.toString()}
          error={errors.isCapital?.message}
          name="isCapital"
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

      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        {buttonLabel}
      </Button>
    </form>
  );
}
