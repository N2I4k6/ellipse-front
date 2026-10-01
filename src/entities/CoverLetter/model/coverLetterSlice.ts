import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { CoverLetterState } from "../types";
import { fetchCoverLetters, generateCoverLetter } from "./thunks";

const initialState: CoverLetterState = {
  letters: [],
  currentLetter: null,
  total: 0,
  page: 1,
  pages: 1,
  loading: false,
  error: null,
};

const coverLetterSlice = createSlice({
  name: "coverLetter",
  initialState,
  reducers: {
    clearCurrentLetter: (state) => {
      state.currentLetter = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateCoverLetter.fulfilled, (state, action) => {
        state.loading = false;
        state.letters.unshift(action.payload);
        state.currentLetter = action.payload;
      })
      .addCase(fetchCoverLetters.fulfilled, (state, action) => {
        state.loading = false;
        state.letters = action.payload.letters;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      });

    builder.addMatcher(
      isAnyOf(generateCoverLetter.pending, fetchCoverLetters.pending),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      isAnyOf(generateCoverLetter.rejected, fetchCoverLetters.rejected),
      (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Неизвестная ошибка";
      }
    );
  },
});

export const { clearCurrentLetter, clearError } = coverLetterSlice.actions;
export default coverLetterSlice.reducer;
