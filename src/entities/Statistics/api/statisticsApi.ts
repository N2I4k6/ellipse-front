import axiosInstance from "@/shared/api/axiosInstance";
import { STATISTICS_ENDPOINTS } from "@/shared/api/endpoints";
import type { AddResponsePayload, Statistics } from "../types";

interface RawStatistics extends Omit<Statistics, "id"> {
  _id: string;
}

const normalize = (raw: RawStatistics): Statistics => ({ ...raw, id: raw._id });

export const statisticsApi = {
  get: async (): Promise<Statistics> => {
    const { data } = await axiosInstance.get<RawStatistics>(
      STATISTICS_ENDPOINTS.base
    );
    return normalize(data);
  },

  addResponse: async (payload: AddResponsePayload): Promise<Statistics> => {
    const { data } = await axiosInstance.post<RawStatistics>(
      STATISTICS_ENDPOINTS.responses,
      payload
    );
    return normalize(data);
  },
};
