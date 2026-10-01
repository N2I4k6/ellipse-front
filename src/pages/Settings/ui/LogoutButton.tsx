import { Button, Popconfirm } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { useAppDispatch } from "@/app/store/hooks";
import { logoutUser } from "@/entities/User";
import styles from "./Settings.module.scss";

const LogoutButton = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    void dispatch(logoutUser());
  };

  return (
    <Popconfirm
      title={t("nav.logout")}
      description={t("auth.logoutConfirm")}
      okText={t("common.yes")}
      cancelText={t("common.no")}
      onConfirm={handleLogout}
    >
      <Button
        className={styles.styledButton}
        icon={<LogoutOutlined />}
        danger
        block
      >
        {t("nav.logout")}
      </Button>
    </Popconfirm>
  );
};

export default LogoutButton;
