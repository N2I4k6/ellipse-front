import type { RootState } from "@/app/store";

export const selectStatistics = (state: RootState) =>
  state.statistics.statistics;
export const selectStatisticsLoading = (state: RootState) =>
  state.statistics.loading;
export const selectStatisticsError = (state: RootState) =>
  state.statistics.error;
