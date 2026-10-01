import axiosInstance from "@/shared/api/axiosInstance";
import { COMPANY_ENDPOINTS } from "@/shared/api/endpoints";
import type { Company, CompanyStage, CompanyStatus } from "../types";
import type { CreateCompanyPayload, CompanyFilters } from "../types";

interface RawCompany extends Omit<Company, "id"> {
  _id: string;
}

interface CompaniesResponse {
  companies: RawCompany[];
  total: number;
  page: number;
  pages: number;
}

const normalize = (raw: RawCompany): Company => ({ ...raw, id: raw._id });

export const companyApi = {
  getStages: async (): Promise<CompanyStage[]> => {
    const { data } = await axiosInstance.get<CompanyStage[]>(
      COMPANY_ENDPOINTS.stages
    );
    return data;
  },

  getStatuses: async (): Promise<CompanyStatus[]> => {
    const { data } = await axiosInstance.get<CompanyStatus[]>(
      COMPANY_ENDPOINTS.statuses
    );
    return data;
  },

  getAll: async (params: CompanyFilters) => {
    const { data } = await axiosInstance.get<CompaniesResponse>(
      COMPANY_ENDPOINTS.base,
      {
        params,
      }
    );
    return { ...data, companies: data.companies.map(normalize) };
  },

  getById: async (id: string): Promise<Company> => {
    const { data } = await axiosInstance.get<RawCompany>(
      COMPANY_ENDPOINTS.byId(id)
    );
    return normalize(data);
  },

  create: async (payload: CreateCompanyPayload): Promise<Company> => {
    const { data } = await axiosInstance.post<RawCompany>(
      COMPANY_ENDPOINTS.base,
      payload
    );
    return normalize(data);
  },

  update: async (id: string, payload: Partial<Company>): Promise<Company> => {
    const { data } = await axiosInstance.put<RawCompany>(
      COMPANY_ENDPOINTS.byId(id),
      payload
    );
    return normalize(data);
  },

  remove: async (id: string): Promise<string> => {
    await axiosInstance.delete(COMPANY_ENDPOINTS.byId(id));
    return id;
  },
};
