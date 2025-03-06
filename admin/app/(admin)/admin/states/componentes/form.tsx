import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, TextInput } from "@mantine/core";

const formSchema = z.object({
  name: z
    .string()
    .nonempty("Campo obrigatório")
    .min(3, "Precisa de ter ao menos 3 caracteres"),
  uf: z
    .string()
    .nonempty("Campo obrigatório")
    .min(2, "Mínimo de 2 caracteres")
    .max(2, "Máximo de 2 caracteres"),
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchemaType>({
    defaultValues: {
      name: data?.name,
      uf: data?.uf,
    },
    resolver: zodResolver(formSchema),
  });

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
          aria-label="Nome do estado"
          error={errors.name?.message}
          {...register("name")}
        />
      </div>

      <div className="flex flex-col gap-1">
        <TextInput
          radius="md"
          type="text"
          label="UF"
          aria-label="Abreviação do estado"
          error={errors.uf?.message}
          maxLength={2}
          {...register("uf")}
        />
      </div>

      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        {buttonLabel}
      </Button>
    </form>
  );
}
