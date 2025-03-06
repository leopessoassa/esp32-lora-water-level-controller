import { restClient } from "@/lib/httpClient";
import { CreateUserRequest, UpdateUserRequest } from "@/models/api";
import { IPagination } from "@/models/http/Pagination";

export const list = async (pagination: IPagination) => {
  return restClient
    .user_list({
      page: pagination.page && +pagination.page > 0 ? +pagination.page - 1 : 0,
      size: pagination.size && +pagination.size > 0 ? +pagination.size : 10,
    })
    .then((res) => res.data);
};
export const create = async (request: CreateUserRequest) => {
  return restClient.user_create(request).then((res) => res);
};
export const update = async (id: number, request: UpdateUserRequest) => {
  return restClient.user_update(id, request).then((res) => res);
};
export const deleteItem = async (id: number) => {
  return restClient.user_delete(id).then((res) => res);
};
