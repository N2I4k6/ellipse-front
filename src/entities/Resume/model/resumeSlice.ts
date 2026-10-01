import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { ResumeState } from "../types";
import {
  deleteEducation,
  deleteExperience,
  fetchResume,
  fetchResumeOptions,
  updateEducation,
  updateExperience,
  updateResume,
  uploadResumePhoto,
} from "./thunks";

const initialState: ResumeState = {
  resume: null,
  options: null,
  loading: false,
  error: null,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    clearResume: (state) => {
      state.resume = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResumeOptions.fulfilled, (state, action) => {
      state.loading = false;
      state.options = action.payload;
    });

    builder.addMatcher(
      isAnyOf(
        fetchResume.fulfilled,
        updateResume.fulfilled,
        uploadResumePhoto.fulfilled,
        updateExperience.fulfilled,
        deleteExperience.fulfilled,
        updateEducation.fulfilled,
        deleteEducation.fulfilled
      ),
      (state, action) => {
        state.loading = false;
        state.resume = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(
        fetchResumeOptions.pending,
        fetchResume.pending,
        updateResume.pending,
        uploadResumePhoto.pending,
        updateExperience.pending,
        deleteExperience.pending,
        updateEducation.pending,
        deleteEducation.pending
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      isAnyOf(
        fetchResumeOptions.rejected,
        fetchResume.rejected,
        updateResume.rejected,
        uploadResumePhoto.rejected,
        updateExperience.rejected,
        deleteExperience.rejected,
        updateEducation.rejected,
        deleteEducation.rejected
      ),
      (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Неизвестная ошибка";
      }
    );
  },
});

export const { clearResume, clearError } = resumeSlice.actions;
export default resumeSlice.reducer;
