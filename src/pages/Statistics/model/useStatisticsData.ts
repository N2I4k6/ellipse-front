import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { Statistics } from "@/entities/Statistics";
import { dayjs } from "@/shared/lib/date/dayjs";

export interface WeeklyResponsesPoint {
  day: string;
  currentWeek: number;
  lastWeek: number;
}

export interface StagePoint {
  name: string;
  value: number;
  fill: string;
}

interface StatisticsData {
  weeklyResponses: WeeklyResponsesPoint[];
  stages: StagePoint[];
  testCompletionPercent: number;
  completedTests: number;
  totalTests: number;
}

const STAGE_COLORS = {
  interviews: "#d3adf7",
  testAssignments: "#ff7300",
  technicalInterviews: "#9254de",
  offers: "#722ed1",
} as const;

export const useStatisticsData = (
  statistics: Statistics | null
): StatisticsData => {
  const { t, i18n } = useTranslation();

  return useMemo(() => {
    const today = dayjs();
    const currentWeekStart = today.startOf("week");
    const lastWeekStart = currentWeekStart.subtract(1, "week");

    const weekdayKeys = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ] as const;

    const responsesByDate = new Map<string, number>();
    statistics?.responses.forEach((r) => {
      responsesByDate.set(dayjs(r.date).format("YYYY-MM-DD"), r.count);
    });

    const weeklyResponses: WeeklyResponsesPoint[] = weekdayKeys.map(
      (key, index) => {
        const currentDay = currentWeekStart
          .add(index, "day")
          .format("YYYY-MM-DD");
        const lastDay = lastWeekStart.add(index, "day").format("YYYY-MM-DD");
        return {
          day: t(`weekdays.${key}`),
          currentWeek: responsesByDate.get(currentDay) ?? 0,
          lastWeek: responsesByDate.get(lastDay) ?? 0,
        };
      }
    );

    const stages = statistics?.stages;
    const stagesData: StagePoint[] = [
      {
        name: t("statistics.interviews"),
        value: stages?.interviews ?? 0,
        fill: STAGE_COLORS.interviews,
      },
      {
        name: t("statistics.testAssignments"),
        value: stages?.test_assignments ?? 0,
        fill: STAGE_COLORS.testAssignments,
      },
      {
        name: t("statistics.technicalInterviews"),
        value: stages?.technical_interviews ?? 0,
        fill: STAGE_COLORS.technicalInterviews,
      },
      {
        name: t("statistics.offers"),
        value: stages?.offers ?? 0,
        fill: STAGE_COLORS.offers,
      },
    ];

    const completedTests = statistics?.tests?.completed ?? 0;
    const totalTests = statistics?.tests?.total ?? 0;
    const testCompletionPercent =
      totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0;

    return {
      weeklyResponses,
      stages: stagesData,
      testCompletionPercent,
      completedTests,
      totalTests,
    };
  }, [statistics, t, i18n.language]);
};
