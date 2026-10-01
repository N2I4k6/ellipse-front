import axiosInstance from "@/shared/api/axiosInstance";
import { COVER_LETTER_ENDPOINTS } from "@/shared/api/endpoints";
import type {
  CoverLetter,
  GenerateCoverLetterPayload,
  GetCoverLettersParams,
} from "../types";

interface RawCoverLetter extends Omit<CoverLetter, "id"> {
  _id?: string;
  id?: string;
}

interface CoverLettersResponse {
  letters: RawCoverLetter[];
  total?: number;
  page?: number;
  pages?: number;
}

const normalize = (raw: RawCoverLetter): CoverLetter => ({
  ...raw,
  id: raw.id ?? raw._id ?? crypto.randomUUID(),
});

export const coverLetterApi = {
  generate: async (
    payload: GenerateCoverLetterPayload
  ): Promise<CoverLetter> => {
    const formData = new FormData();
    formData.append("vacancyUrl", payload.vacancyUrl);
    formData.append("resume", payload.resume);

    const { data } = await axiosInstance.post<RawCoverLetter>(
      COVER_LETTER_ENDPOINTS.generate,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return normalize(data);
  },

  getAll: async (params: GetCoverLettersParams) => {
    const { data } = await axiosInstance.get<CoverLettersResponse>(
      COVER_LETTER_ENDPOINTS.base,
      { params }
    );
    return {
      letters: data.letters.map(normalize),
      total: data.total ?? data.letters.length,
      page: data.page ?? params.page ?? 1,
      pages: data.pages ?? 1,
    };
  },
};
