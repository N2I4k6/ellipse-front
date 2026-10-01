import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { StatisticsState } from "../types";
import { addResponse, fetchStatistics } from "./thunks";

const initialState: StatisticsState = {
  statistics: null,
  loading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    clearStatistics: (state) => {
      state.statistics = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })
      .addCase(addResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      });

    builder.addMatcher(
      isAnyOf(fetchStatistics.pending, addResponse.pending),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      isAnyOf(fetchStatistics.rejected, addResponse.rejected),
      (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Неизвестная ошибка";
      }
    );
  },
});

export const { clearStatistics, clearError } = statisticsSlice.actions;
export default statisticsSlice.reducer;
