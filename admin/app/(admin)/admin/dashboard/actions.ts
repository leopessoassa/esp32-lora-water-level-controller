import { restClient } from "@/lib/httpClient";
import { SumaryResponse } from "@/models/api";

export const sumary_last_measurement = async (qrCode: string) => {
  try {
    return restClient.sumary_last_measurement(qrCode).then((res: any) => {
      return res.data as unknown as SumaryResponse[];
    });
  } catch (error) {
    console.log("[Action][sumary_last_measurement] ERRO = ", error);
  }
};

export const sumary_by_month = async (
  qrCode: string,
  params: {
    year: number;
    month: number;
  }
) => {
  try {
    return restClient.sumary_by_month(qrCode, params).then((res: any) => {
      return res.data as unknown as SumaryResponse[];
    });
  } catch (error) {
    console.log("[Action][sumary_by_month] ERRO = ", error);
  }
};

export const sumary_by_date = async (
  qrCode: string,
  params: { date: string }
) => {
  try {
    return restClient.sumary_by_date(qrCode, params).then((res: any) => {
      return res.data as unknown as SumaryResponse[];
    });
  } catch (error) {
    console.log("[Action][sumary_by_date] ERRO = ", error);
  }
};

export const sumary_last = async (qrCode: string) => {
  try {
    return restClient.sumary_last(qrCode).then((res: any) => {
      return res.data as unknown as SumaryResponse;
    });
  } catch (error) {
    console.log("[Action][sumary_last] ERRO = ", error);
  }
};
