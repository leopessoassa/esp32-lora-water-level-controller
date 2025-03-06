import { restClient } from "@/lib/httpClient";
import {
  CreateCisternRequest,
  PagedResponse,
  CisternResponse,
  UpdateCisternRequest,
} from "@/models/api";

interface IListProps {
  name?: string;
  uf?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export const cistern_list = async (params: IListProps) => {
  const request: IListProps = {
    ...params,
    page: params.page && +params.page > 0 ? +params.page - 1 : 0,
  };
  //console.log("[ACTION] cistern_list", params, request);
  return restClient
    .cistern_list({ ...request })
    .then((res) => res.data as unknown as PagedResponse<CisternResponse>);
};
export const cistern_detail = async (id: number) => {
  return restClient
    .cistern_detail(id)
    .then((res: any) => res.data as unknown as CisternResponse);
};
export const cistern_create = async (request: CreateCisternRequest) => {
  return restClient
    .cistern_create(request)
    .then((res: any) => res.data as unknown as CisternResponse);
};
export const cistern_update = async (
  id: number,
  request: UpdateCisternRequest
) => {
  return restClient
    .cistern_update(id, request)
    .then((res: any) => res.data as unknown as CisternResponse);
};
export const cistern_delete = async (id: number) => {
  return restClient
    .cistern_delete(id)
    .then((res: any) => res.data as unknown as boolean);
};
