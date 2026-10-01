import { Card, Typography, Spin, Alert } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentTest,
  selectTestLoading,
  selectTestError,
  selectTestRemainingMinutes,
  selectLatestTestResult,
} from "@/entities/Test";
import { rgbaFromHex } from "@/shared/lib/color/hexToRgb";

import { useTestLoader } from "./model/useTestLoader";
import { useTestAnswers } from "./model/useTestAnswers";
import { useRestartCooldown } from "./model/useRestartCooldown";
import { useSubmitTest } from "./model/useSubmitTest";
import { useTestRestart } from "./model/useTestRestart";
import { TestHeader } from "./ui/TestHeader";
import { QuestionCard } from "./ui/QuestionCard";
import { TestActions } from "./ui/TestActions";
import { TestResultsBlock } from "./ui/TestResultsBlock";
import styles from "./ui/Test.module.scss";

const { Text } = Typography;

const FALLBACK_TEST_COLOR = "#1890ff";

const TestPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const test = useAppSelector(selectCurrentTest);
  const loading = useAppSelector(selectTestLoading);
  const error = useAppSelector(selectTestError);
  const remainingMinutes = useAppSelector(selectTestRemainingMinutes);
  const latestResult = useAppSelector(selectLatestTestResult);

  useTestLoader(id);

  const {
    answers,
    isComplete,
    setAnswer,
    reset: resetAnswers,
  } = useTestAnswers(test);
  const { submit } = useSubmitTest(test, answers, isComplete, resetAnswers);
  const { restart } = useTestRestart(test, resetAnswers);

  useRestartCooldown(test?.id, remainingMinutes);

  if (loading && !test) {
    return (
      <div className={styles.center}>
        <Spin size="large" />
      </div>
    );
  }

  if (error && !remainingMinutes) {
    return (
      <div className={styles.center}>
        <Text type="danger">
          {t("common.error")}: {error}
        </Text>
      </div>
    );
  }

  if (!test) {
    return (
      <div className={styles.center}>
        <Text>{t(id ? "tests.notFound" : "tests.generalNotFound")}</Text>
      </div>
    );
  }

  const isLocked = Boolean(latestResult);
  const selectedById = new Map(
    answers.map((a) => [a.questionId, a.selectedOption])
  );

  return (
    <div className={styles.container}>
      <Card
        className={styles.testCard}
        style={{
          backgroundColor: rgbaFromHex(FALLBACK_TEST_COLOR, 0.2),
          borderColor: FALLBACK_TEST_COLOR,
        }}
      >
        {remainingMinutes ? (
          <Alert
            message={t("tests.waitToRestart", { minutes: remainingMinutes })}
            type="warning"
            showIcon
            className={styles.alert}
          />
        ) : null}

        <TestHeader title={test.title} />

        <div className={styles.contentBlock}>
          {test.description && <Text>{test.description}</Text>}

          {test.questions.length === 0 ? (
            <Text>{t("tests.questionsForming")}</Text>
          ) : (
            test.questions.map((question, index) => (
              <QuestionCard
                key={question.id ?? index}
                question={question}
                index={index}
                selectedOption={
                  question.id ? selectedById.get(question.id) : undefined
                }
                disabled={isLocked}
                onAnswer={setAnswer}
              />
            ))
          )}
        </div>

        {test.questions.length > 0 && (
          <TestActions
            isLoading={loading}
            canSubmit={isComplete}
            isLocked={isLocked}
            topicId={test.topicId}
            isGeneral={test.isGeneral}
            onSubmit={() => void submit()}
            onRestart={() => void restart()}
          />
        )}

        {latestResult && <TestResultsBlock result={latestResult} />}
      </Card>
    </div>
  );
};

export default TestPage;
