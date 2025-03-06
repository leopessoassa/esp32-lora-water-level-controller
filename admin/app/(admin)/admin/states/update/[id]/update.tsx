"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { state_detail, state_update } from "../../actions";
import { UpdateStateRequest } from "@/models/api";
import ErrorFeedback from "@/components/error-feedback";
import { HttpErrorResponse } from "@/models/http/HttpErrorResponse";
import { HttpStatusCode } from "axios";
import SuccessFeedback from "@/components/success-feedback";
import FormModel from "../../componentes/form";

export default function Update({ id }: { id: number }) {
  const queryClient = useQueryClient();
  const { data, isPending } = useSuspenseQuery({
    queryKey: ["state_detail", id],
    queryFn: () => state_detail(id),
  });

  const updateModel = useMutation({
    mutationFn: (request: UpdateStateRequest) => state_update(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["state_list"],
        refetchType: "all",
      });
    },
  });

  if (isPending) {
    return "<p>Carregando dados</p>";
  }

  if (!data) {
    return "<p>Sem dados</p>";
  }

  function onSubmit(data: UpdateStateRequest) {
    console.log("[UpdateState] onSubmit", data);
    updateModel.mutate(data);
  }

  function getErrors() {
    const res: HttpErrorResponse = {
      message: updateModel.error?.message || "erro ao atualizar",
      status: HttpStatusCode.BadRequest,
    };
    return res;
  }

  return (
    <>
      <SuccessFeedback
        show={updateModel.isSuccess}
        message="Atualizado com sucesso"
      />

      <FormModel
        data={data}
        isPending={updateModel.isPending}
        buttonLabel="Salvar"
        onSubmit={onSubmit}
      />

      {updateModel.isError && <ErrorFeedback data={getErrors()} />}
    </>
  );
}
