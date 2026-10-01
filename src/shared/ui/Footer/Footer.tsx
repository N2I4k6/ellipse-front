import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FOOTER_NAV_ITEMS } from "@/shared/config/navigation";
import { useSelectedNavKey } from "@/shared/lib/hooks/useSelectedNavKey";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const navigate = useNavigate();
  const selectedKey = useSelectedNavKey();
  const { t } = useTranslation();

  const items = FOOTER_NAV_ITEMS.map((item) => ({
    key: item.key,
    label: (
      <div className={styles.tabItem}>
        <span className={styles.icon}>{item.icon}</span>
        <span>{t(item.labelKey)}</span>
      </div>
    ),
  }));

  return (
    <div className={styles.footer}>
      <Tabs
        activeKey={selectedKey}
        onChange={(key) => navigate(key)}
        items={items}
        centered
        className={styles.tabs}
      />
    </div>
  );
};

export default Footer;
