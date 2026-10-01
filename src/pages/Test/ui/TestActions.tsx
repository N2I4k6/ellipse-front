import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/config/routes";
import styles from "./Test.module.scss";

interface TestActionsProps {
  isLoading: boolean;
  canSubmit: boolean;
  isLocked: boolean;
  topicId?: string;
  isGeneral?: boolean;
  onSubmit: () => void;
  onRestart: () => void;
}

export const TestActions = ({
  isLoading,
  canSubmit,
  isLocked,
  topicId,
  isGeneral,
  onSubmit,
  onRestart,
}: TestActionsProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Space className={styles.actions} wrap>
      <Button
        type="primary"
        onClick={onSubmit}
        disabled={!canSubmit || isLocked}
      >
        {t("tests.submit")}
      </Button>

      {topicId && !isGeneral && (
        <Button
          onClick={() => navigate(ROUTES.private.documentationTopic(topicId))}
        >
          {t("study.documentationLink")}
        </Button>
      )}

      {isLocked && (
        <Button onClick={onRestart} disabled={isLoading}>
          {t("tests.retake")}
        </Button>
      )}
    </Space>
  );
};
