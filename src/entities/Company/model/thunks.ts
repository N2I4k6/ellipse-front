import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "@/shared/lib/errors";
import { companyApi } from "../api/companyApi";
import type {
  Company,
  CompanyFilters,
  CompanyStage,
  CompanyStatus,
  CreateCompanyPayload,
} from "../types";

export const fetchStages = createAsyncThunk<
  CompanyStage[],
  void,
  { rejectValue: string }
>("company/fetchStages", async (_, { rejectWithValue }) => {
  try {
    return await companyApi.getStages();
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, "Ошибка получения стадий"));
  }
});

export const fetchStatuses = createAsyncThunk<
  CompanyStatus[],
  void,
  { rejectValue: string }
>("company/fetchStatuses", async (_, { rejectWithValue }) => {
  try {
    return await companyApi.getStatuses();
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, "Ошибка получения статусов"));
  }
});

export const fetchCompanies = createAsyncThunk<
  { companies: Company[]; total: number; page: number; pages: number },
  CompanyFilters,
  { rejectValue: string }
>("company/fetchAll", async (params, { rejectWithValue }) => {
  try {
    return await companyApi.getAll(params);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, "Ошибка получения компаний"));
  }
});

export const fetchCompanyById = createAsyncThunk<
  Company,
  string,
  { rejectValue: string }
>("company/fetchById", async (id, { rejectWithValue }) => {
  try {
    return await companyApi.getById(id);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, "Ошибка получения компании"));
  }
});

export const createCompany = createAsyncThunk<
  Company,
  CreateCompanyPayload,
  { rejectValue: string }
>("company/create", async (payload, { rejectWithValue }) => {
  try {
    return await companyApi.create(payload);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, "Ошибка создания компании"));
  }
});

export const updateCompany = createAsyncThunk<
  Company,
  { id: string; data: Partial<Company> },
  { rejectValue: string }
>("company/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await companyApi.update(id, data);
  } catch (e) {
    return rejectWithValue(
      extractErrorMessage(e, "Ошибка обновления компании")
    );
  }
});

export const deleteCompany = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("company/delete", async (id, { rejectWithValue }) => {
  try {
    return await companyApi.remove(id);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, "Ошибка удаления компании"));
  }
});
