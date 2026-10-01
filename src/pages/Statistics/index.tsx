import { useEffect } from "react";
import { Card, Typography, Progress, Spin } from "antd";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchStatistics,
  selectStatistics,
  selectStatisticsLoading,
  selectStatisticsError,
} from "@/entities/Statistics";

import { useStatisticsData } from "./model/useStatisticsData";
import { ResponsesChart } from "./ui/ResponsesChart";
import { StagesChart } from "./ui/StagesChart";
import styles from "./ui/Statistics.module.scss";

const { Title, Text } = Typography;

const StatisticsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const statistics = useAppSelector(selectStatistics);
  const loading = useAppSelector(selectStatisticsLoading);
  const error = useAppSelector(selectStatisticsError);

  const data = useStatisticsData(statistics);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  if (loading && !statistics) {
    return (
      <div className={styles.center}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.center}>
        <Text type="danger">
          {t("common.error")}: {error}
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.blocks}>
        <Card className={styles.block}>
          <Title level={3}>{t("statistics.responses")}</Title>
          <Text className={styles.description}>
            {t("statistics.responsesWeeklyComparison")}
          </Text>
          <div className={styles.chartContainer}>
            <ResponsesChart data={data.weeklyResponses} />
          </div>
        </Card>

        <div className={styles.bottomBlocks}>
          <Card className={styles.block}>
            <Title level={3}>{t("statistics.stages")}</Title>
            <Text className={styles.description}>
              {t("statistics.stagesCount")}
            </Text>
            <div className={styles.chartContainer}>
              <StagesChart data={data.stages} />
            </div>
          </Card>

          <Card className={styles.block}>
            <Title level={3}>{t("statistics.testsCompletion")}</Title>
            <Text className={styles.description}>
              {t("statistics.completedTests")}
            </Text>
            <div className={styles.progressContainer}>
              <Progress
                type="circle"
                percent={data.testCompletionPercent}
                size={120}
              />
              <Text className={styles.progressText}>
                {data.completedTests} / {data.totalTests}
              </Text>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
