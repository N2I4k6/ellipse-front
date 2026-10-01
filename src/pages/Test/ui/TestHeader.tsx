import { Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/shared/config/routes";
import styles from "./Test.module.scss";

const { Title } = Typography;

interface TestHeaderProps {
  title: string;
}

export const TestHeader = ({ title }: TestHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(ROUTES.private.study)}
        className={styles.backButton}
      >
        {t("common.goBack")}
      </Button>
      <Title level={2} className={styles.title}>
        {title}
      </Title>
    </header>
  );
};
