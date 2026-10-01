import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import type { Section, Topic } from "../types";

export const selectSections = (state: RootState) => state.sectionTopic.sections;
export const selectTopics = (state: RootState) => state.sectionTopic.topics;
export const selectCurrentSection = (state: RootState) =>
  state.sectionTopic.currentSection;
export const selectCurrentTopic = (state: RootState) =>
  state.sectionTopic.currentTopic;
export const selectSectionPagination = (state: RootState) => ({
  total: state.sectionTopic.totalSections,
  page: state.sectionTopic.pageSections,
  pages: state.sectionTopic.pagesSections,
});
export const selectSectionTopicLoading = (state: RootState) =>
  state.sectionTopic.loading;
export const selectSectionTopicError = (state: RootState) =>
  state.sectionTopic.error;

export const selectSectionsWithCompletion = createSelector(
  [selectSections, selectTopics],
  (sections, topics): Section[] => {
    const topicMap = new Map(topics.map((t) => [t.id, t]));

    return sections.map((section) => {
      const items = section.items.filter((id) => topicMap.has(id));
      const completed =
        items.length > 0 &&
        items.every((id) => topicMap.get(id)?.completed === true);

      return { ...section, items, completed };
    });
  }
);

export const selectTopicsBySection = createSelector(
  [selectSectionsWithCompletion, selectTopics],
  (sections, topics) => {
    const result: Record<string, Topic[]> = {};
    for (const section of sections) {
      result[section.id] = topics.filter((t) =>
        t.sections.includes(section.id)
      );
    }
    return result;
  }
);
