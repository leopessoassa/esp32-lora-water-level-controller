import { restClient } from "@/lib/httpClient";
import { generatePassword } from "@/lib/utils";
import {
  CreateOwnerRequest,
  PagedResponse,
  OwnerResponse,
  UpdateOwnerRequest,
  Role,
} from "@/models/api";

interface IListProps {
  name?: string;
  email?: string;
  stateId?: number;
  cityId?: number;
  page?: number;
  size?: number;
  sort?: string;
}

export const owner_list = async (params: IListProps) => {
  const request: IListProps = {
    ...params,
    page: params.page && +params.page > 0 ? +params.page - 1 : 0,
  };
  return restClient
    .owner_list({ ...request })
    .then((res) => res.data as unknown as PagedResponse<OwnerResponse>);
};
export const owner_detail = async (id: number) => {
  return restClient
    .owner_detail(id)
    .then((res: any) => res.data as unknown as OwnerResponse);
};
export const owner_create = async (request: CreateOwnerRequest) => {
  return restClient
    .owner_create(request)
    .then((res: any) => res.data as unknown as OwnerResponse);
};
export const owner_update = async (id: number, request: UpdateOwnerRequest) => {
  return restClient
    .owner_update(id, request)
    .then((res: any) => res.data as unknown as OwnerResponse);
};
export const owner_delete = async (id: number) => {
  return restClient
    .owner_delete(id)
    .then((res: any) => res.data as unknown as boolean);
};
