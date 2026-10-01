import { Card, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import type { TestResultAnswer } from "@/entities/Test";
import { HtmlContent } from "@/shared/ui/HtmlContent";
import styles from "./Test.module.scss";

const { Text } = Typography;

interface ResultCardProps {
  answer: TestResultAnswer;
}

export const ResultCard = ({ answer }: ResultCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.resultCard}>
      <Space direction="vertical" size="small" className={styles.resultContent}>
        <HtmlContent html={answer.questionText} />

        <div>
          <Text strong>{t("tests.yourAnswer")}: </Text>
          <Text className={answer.isCorrect ? styles.correct : styles.wrong}>
            {answer.selectedOptionText}
          </Text>
        </div>

        {!answer.isCorrect && (
          <div>
            <Text>
              {t("tests.rightAnswer")}: {answer.correctOptionText}
            </Text>
          </div>
        )}
      </Space>
    </Card>
  );
};
