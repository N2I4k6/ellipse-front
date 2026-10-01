import type { RootState } from '@/app/store';

export const selectTests = (state: RootState) => state.test.tests;
export const selectCurrentTest = (state: RootState) => state.test.currentTest;
export const selectTestResults = (state: RootState) => state.test.testResults;
export const selectTestPagination = (state: RootState) => ({
  total: state.test.total,
  page: state.test.page,
  pages: state.test.pages,
});
export const selectTestLoading = (state: RootState) => state.test.loading;
export const selectTestError = (state: RootState) => state.test.error;
export const selectTestRemainingMinutes = (state: RootState) =>
  state.test.remainingMinutes;

export const selectLatestTestResult = (state: RootState) => {
  const results = state.test.testResults;
  return results.length > 0 ? results[results.length - 1] : null;
};