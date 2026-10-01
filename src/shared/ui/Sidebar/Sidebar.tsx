import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { NAV_ITEMS } from "@/shared/config/navigation";
import { useSelectedNavKey } from "@/shared/lib/hooks/useSelectedNavKey";
import styles from "./Sidebar.module.scss";

export const Sidebar = () => {
  const selectedKey = useSelectedNavKey();
  const { t } = useTranslation();

  const items = NAV_ITEMS.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: <Link to={item.key}>{t(item.labelKey)}</Link>,
  }));

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      className={styles.sidebar}
      items={items}
    />
  );
};

export default Sidebar;
