import { Card, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";
import { selectCurrentUser } from "@/entities/User";
import { ROUTES } from "@/shared/config/routes";
import styles from "./ui/Study.module.scss";

const { Title, Text } = Typography;

const StudyPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const level = user?.position?.level;

  return (
    <div className={styles.container}>
      <div className={styles.blocks}>
        <Card
          hoverable
          className={`${styles.block} ${styles.levelUpBlock}`}
          onClick={() => navigate(ROUTES.private.generalTest)}
        >
          <div className={styles.levelUpContent}>
            <div className={styles.textBlock}>
              <Title level={3}>{t("study.raisingLevel")}</Title>
              <Text className={styles.description}>
                {t("study.takeTestTopics")}
              </Text>
            </div>
            {level && (
              <div className={styles.levelInfo}>
                <SmileOutlined className={styles.levelIcon} />
                <Text strong>{t(`messages.levels.${level}`)}</Text>
              </div>
            )}
          </div>
        </Card>

        <div className={styles.bottomBlocks}>
          <Card
            hoverable
            className={styles.block}
            onClick={() => navigate(ROUTES.private.tests)}
          >
            <Title level={3}>{t("study.training")}</Title>
            <Text className={styles.description}>
              {t("study.practiceTests")}
            </Text>
          </Card>

          <Card
            hoverable
            className={styles.block}
            onClick={() => navigate(ROUTES.private.documentation)}
          >
            <Title level={3}>{t("study.title")}</Title>
            <Text className={styles.description}>
              {t("study.goThroughAllMaterials")}
            </Text>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudyPage;
