export interface IPagination {
  page: string;
  size: string;
  sort: "ASC" | "DESC";
}

export function parsePagination(params: IPagination) {
  let page = +params.page;

  return {
    page: page > 0 ? page - 1 : 0,
    size: +params.size,
    sort: params.sort.toString(),
  };
}

export const defaultPagination: IPagination = {
  page: "1",
  size: "10",
  sort: "ASC",
};
