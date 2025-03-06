"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateStateRequest } from "@/models/api";
import ErrorFeedback from "@/components/error-feedback";
import { HttpErrorResponse } from "@/models/http/HttpErrorResponse";
import { HttpStatusCode } from "axios";
import SuccessFeedback from "@/components/success-feedback";
import { state_create } from "../actions";
import FormModel from "../componentes/form";

export default function Create() {
  const queryClient = useQueryClient();
  const createModel = useMutation({
    mutationFn: (request: CreateStateRequest) => state_create(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["state_list"],
        refetchType: "all",
      });
    },
  });

  function onSubmit(data: CreateStateRequest) {
    console.log("[CreateState] onSubmit", data);
    createModel.mutate(data);
  }

  function getErrors() {
    const res: HttpErrorResponse = {
      message: createModel.error?.message || "erro ao atualizar",
      status: HttpStatusCode.BadRequest,
    };
    return res;
  }

  return (
    <>
      <SuccessFeedback
        show={createModel.isSuccess}
        message="Atualizado com sucesso"
      />

      <FormModel
        isPending={createModel.isPending}
        buttonLabel="Salvar"
        onSubmit={onSubmit}
      />

      {createModel.isError && <ErrorFeedback data={getErrors()} />}
    </>
  );
}
