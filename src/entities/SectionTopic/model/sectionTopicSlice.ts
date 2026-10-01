import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { SectionTopicState } from "../types";
import {
  createSection,
  createTopic,
  deleteSection,
  deleteTopic,
  fetchSectionById,
  fetchSections,
  fetchTopicById,
  updateSection,
  updateTopic,
} from "./thunks";

const initialState: SectionTopicState = {
  sections: [],
  topics: [],
  totalSections: 0,
  pageSections: 1,
  pagesSections: 1,
  currentSection: null,
  currentTopic: null,
  loading: false,
  error: null,
};

const sectionTopicSlice = createSlice({
  name: "sectionTopic",
  initialState,
  reducers: {
    clearCurrentSection: (state) => {
      state.currentSection = null;
    },
    clearCurrentTopic: (state) => {
      state.currentTopic = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload.sections;
        state.totalSections = action.payload.total;
        state.pageSections = action.payload.page;
        state.pagesSections = action.payload.pages;
      })
      .addCase(fetchSectionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSection = action.payload;
      })
      .addCase(createSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections.push(action.payload);
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.sections.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.sections[idx] = action.payload;
        if (state.currentSection?.id === action.payload.id) {
          state.currentSection = action.payload;
        }
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = state.sections.filter((s) => s.id !== action.payload);
        if (state.currentSection?.id === action.payload) {
          state.currentSection = null;
        }
      })
      .addCase(fetchTopicById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTopic = action.payload;
      })
      .addCase(createTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics.push(action.payload);
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.topics.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.topics[idx] = action.payload;
        if (state.currentTopic?.id === action.payload.id) {
          state.currentTopic = action.payload;
        }
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = state.topics.filter((t) => t.id !== action.payload);
        if (state.currentTopic?.id === action.payload) {
          state.currentTopic = null;
        }
      });

    builder.addMatcher(
      isAnyOf(
        fetchSections.pending,
        fetchSectionById.pending,
        createSection.pending,
        updateSection.pending,
        deleteSection.pending,
        fetchTopicById.pending,
        createTopic.pending,
        updateTopic.pending,
        deleteTopic.pending
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      isAnyOf(
        fetchSections.rejected,
        fetchSectionById.rejected,
        createSection.rejected,
        updateSection.rejected,
        deleteSection.rejected,
        fetchTopicById.rejected,
        createTopic.rejected,
        updateTopic.rejected,
        deleteTopic.rejected
      ),
      (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Неизвестная ошибка";
      }
    );
  },
});

export const { clearCurrentSection, clearCurrentTopic, clearError } =
  sectionTopicSlice.actions;
export default sectionTopicSlice.reducer;
