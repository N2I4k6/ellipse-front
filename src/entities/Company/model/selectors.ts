import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { CalendarEvent } from '../types';

export const selectCompanies = (state: RootState) => state.company.companies;
export const selectStages = (state: RootState) => state.company.stages;
export const selectStatuses = (state: RootState) => state.company.statuses;
export const selectCurrentCompany = (state: RootState) => state.company.currentCompany;
export const selectCompanyPagination = (state: RootState) => ({
  total: state.company.total,
  page: state.company.page,
  pages: state.company.pages,
});
export const selectCompanyLoading = (state: RootState) => state.company.loading;
export const selectCompanyFormLoading = (state: RootState) => state.company.formLoading;
export const selectCompanyError = (state: RootState) => state.company.error;

const findTitle = <T extends { type: number; title: string }>(
  list: T[],
  type: number,
): string => list.find((item) => item.type === type)?.title ?? 'Неизвестно';

export const selectCalendarEvents = createSelector(
  [selectCompanies, selectStages, selectStatuses],
  (companies, stages, statuses): CalendarEvent[] =>
    companies.flatMap((company) =>
      company.history
        .filter((entry) => entry.stage > 1)
        .map((entry) => ({
          id: `${company.id}-${entry.stage}`,
          companyName: company.companyName || 'Без имени',
          stageTitle: findTitle(stages, entry.stage),
          statusTitle: findTitle(statuses, company.status),
          start: entry.date.split('T')[0],
          allDay: true,
          color: entry.stage === company.stage ? 'blue' : 'gray',
          extendedProps: {
            companyId: company.id,
            stage: entry.stage,
            status: company.status,
            isPast: entry.stage !== company.stage,
          },
        })),
    ),
);