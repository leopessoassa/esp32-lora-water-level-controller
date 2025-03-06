import { restClient } from "@/lib/httpClient.service";
import { CisternResponse } from "@/models/api";

export const cistern_find = async (qrCode: string) => {
  await csrf();
  try{
    return restClient
    .cistern_find(qrCode)
    .then((res: any) => {
      return res.data as unknown as CisternResponse;
    });
  } catch (error) {
    console.log("[Action][cistern_find] ERRO = ", error);
  }
};

const csrf = async () => {
  try {
    await restClient.csrf();
  } catch (error) {
    console.log("[Action][csrf] ERRO = ", error);
  }
};
