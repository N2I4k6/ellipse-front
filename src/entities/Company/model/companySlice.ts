import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { CompanyState } from "../types";
import {
  createCompany,
  deleteCompany,
  fetchCompanies,
  fetchCompanyById,
  fetchStages,
  fetchStatuses,
  updateCompany,
} from "./thunks";

const initialState: CompanyState = {
  companies: [],
  stages: [],
  statuses: [],
  total: 0,
  page: 1,
  pages: 1,
  currentCompany: null,
  loading: false,
  formLoading: false,
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    clearCurrentCompany: (state) => {
      state.currentCompany = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStages.fulfilled, (state, action) => {
        state.loading = false;
        state.stages = action.payload;
      })
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        state.loading = false;
        state.statuses = action.payload;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload.companies;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCompany = action.payload;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.formLoading = false;
        state.companies.unshift(action.payload);
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.formLoading = false;
        const idx = state.companies.findIndex(
          (c) => c.id === action.payload.id
        );
        if (idx !== -1) state.companies[idx] = action.payload;
        if (state.currentCompany?.id === action.payload.id) {
          state.currentCompany = action.payload;
        }
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.filter(
          (c) => c.id !== action.payload
        );
        if (state.currentCompany?.id === action.payload) {
          state.currentCompany = null;
        }
      });

    builder.addMatcher(
      isAnyOf(
        fetchStages.pending,
        fetchStatuses.pending,
        fetchCompanies.pending,
        fetchCompanyById.pending,
        deleteCompany.pending
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      isAnyOf(createCompany.pending, updateCompany.pending),
      (state) => {
        state.formLoading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      isAnyOf(
        fetchStages.rejected,
        fetchStatuses.rejected,
        fetchCompanies.rejected,
        fetchCompanyById.rejected,
        createCompany.rejected,
        updateCompany.rejected,
        deleteCompany.rejected
      ),
      (state, action) => {
        state.loading = false;
        state.formLoading = false;
        state.error = (action.payload as string) ?? "Неизвестная ошибка";
      }
    );
  },
});

export const { clearCurrentCompany, clearError } = companySlice.actions;
export default companySlice.reducer;