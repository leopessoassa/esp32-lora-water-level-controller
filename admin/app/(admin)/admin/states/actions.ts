import { restClient } from "@/lib/httpClient";
import {
  CreateStateRequest,
  PagedResponse,
  StateResponse,
  UpdateStateRequest,
} from "@/models/api";

interface IListProps {
  name?: string;
  uf?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export const state_list = async (params: IListProps) => {
  const request: IListProps = {
    ...params,
    page: params.page && +params.page > 0 ? +params.page - 1 : 0,
  };
  //console.log("[ACTION] state_list", params, request);
  return restClient
    .state_list({ ...request })
    .then((res) => res.data as unknown as PagedResponse<StateResponse>);
};
export const state_detail = async (id: number) => {
  return restClient
    .state_detail(id)
    .then((res: any) => res.data as unknown as StateResponse);
};
export const state_create = async (request: CreateStateRequest) => {
  return restClient
    .state_create(request)
    .then((res: any) => res.data as unknown as StateResponse);
};
export const state_update = async (id: number, request: UpdateStateRequest) => {
  return restClient
    .state_update(id, request)
    .then((res: any) => res.data as unknown as StateResponse);
};
export const state_delete = async (id: number) => {
  return restClient
    .state_delete(id)
    .then((res: any) => res.data as unknown as boolean);
};
