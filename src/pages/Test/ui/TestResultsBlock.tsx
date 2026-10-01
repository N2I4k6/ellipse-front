import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { TestResult } from "@/entities/Test";
import { dayjs } from "@/shared/lib/date/dayjs";
import { ResultCard } from "./ResultCard";
import styles from "./Test.module.scss";

const { Title, Text } = Typography;

interface TestResultsBlockProps {
  result: TestResult;
}

export const TestResultsBlock = ({ result }: TestResultsBlockProps) => {
  const { t } = useTranslation();
  const isFailed = result.score !== result.totalQuestions;

  return (
    <section className={styles.resultsBlock}>
      <Title level={4}>{t("tests.results")}</Title>

      <Text>
        {t("tests.score")}: {result.score} / {result.totalQuestions}
        {isFailed && (
          <Text type="danger" className={styles.failText}>
            {t("tests.notPassed")}
          </Text>
        )}
      </Text>

      <Text className={styles.submittedAt}>
        {t("tests.submittedAt")}:{" "}
        {dayjs(result.submittedAt).format("DD.MM.YYYY HH:mm:ss")}
      </Text>

      {result.answers.map((answer) => (
        <ResultCard key={answer.questionId} answer={answer} />
      ))}
    </section>
  );
};
