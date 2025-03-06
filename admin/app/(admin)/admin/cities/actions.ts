import { restClient } from "@/lib/httpClient";
import {
  CreateCityRequest,
  PagedResponse,
  CityResponse,
  UpdateCityRequest,
} from "@/models/api";

interface IListProps {
  name?: string;
  uf?: string;
  isCapital?: boolean;
  page?: number;
  size?: number;
  sort?: string;
}

export const city_list = async (params: IListProps) => {
  const request: IListProps = {
    ...params,
    page: params.page && +params.page > 0 ? +params.page - 1 : 0,
  };
  //console.log("[ACTION] city_list", params, request);
  return restClient
    .city_list({ ...request })
    .then((res) => res.data as unknown as PagedResponse<CityResponse>);
};
export const city_detail = async (id: number) => {
  return restClient
    .city_detail(id)
    .then((res: any) => res.data as unknown as CityResponse);
};
export const city_create = async (request: CreateCityRequest) => {
  return restClient
    .city_create(request)
    .then((res: any) => res.data as unknown as CityResponse);
};
export const city_update = async (id: number, request: UpdateCityRequest) => {
  return restClient
    .city_update(id, request)
    .then((res: any) => res.data as unknown as CityResponse);
};
export const city_delete = async (id: number) => {
  return restClient
    .city_delete(id)
    .then((res: any) => res.data as unknown as boolean);
};
