import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { RateLimitError, TestState } from "../types";
import {
  createTest,
  deleteTestResults,
  fetchGeneralTest,
  fetchTestById,
  fetchTestResults,
  fetchTests,
  submitTestAnswers,
} from "./thunks";

const initialState: TestState = {
  tests: [],
  currentTest: null,
  testResults: [],
  total: 0,
  page: 1,
  pages: 1,
  loading: false,
  error: null,
  remainingMinutes: null,
};

const isRateLimitError = (payload: unknown): payload is RateLimitError =>
  typeof payload === "object" &&
  payload !== null &&
  "msg" in payload &&
  "remainingMinutes" in payload;

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    clearCurrentTest: (state) => {
      state.currentTest = null;
    },
    clearTestResults: (state) => {
      state.testResults = [];
      state.remainingMinutes = null;
    },
    clearError: (state) => {
      state.error = null;
      state.remainingMinutes = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload.tests;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchTestById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTest = action.payload;
      })
      .addCase(fetchGeneralTest.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTest = action.payload;
      })
      .addCase(createTest.fulfilled, (state, action) => {
        state.loading = false;
        state.tests.push(action.payload);
      })
      .addCase(submitTestAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.testResults.push(action.payload);
      })
      .addCase(fetchTestResults.fulfilled, (state, action) => {
        state.loading = false;
        state.testResults = action.payload;
      });

    builder.addCase(deleteTestResults.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.remainingMinutes = null;
    });

    builder.addCase(deleteTestResults.fulfilled, (state) => {
      state.loading = false;
      state.testResults = [];
      state.remainingMinutes = null;
    });

    builder.addCase(deleteTestResults.rejected, (state, action) => {
      state.loading = false;
      if (isRateLimitError(action.payload)) {
        state.error = action.payload.msg;
        state.remainingMinutes = action.payload.remainingMinutes;
      } else {
        state.error = (action.payload as string) ?? "Неизвестная ошибка";
      }
    });

    builder.addMatcher(
      isAnyOf(
        fetchTests.pending,
        fetchTestById.pending,
        fetchGeneralTest.pending,
        createTest.pending,
        submitTestAnswers.pending,
        fetchTestResults.pending
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      isAnyOf(
        fetchTests.rejected,
        fetchTestById.rejected,
        fetchGeneralTest.rejected,
        createTest.rejected,
        submitTestAnswers.rejected,
        fetchTestResults.rejected
      ),
      (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Неизвестная ошибка";
      }
    );
  },
});

export const { clearCurrentTest, clearTestResults, clearError } =
  testSlice.actions;
export default testSlice.reducer;
