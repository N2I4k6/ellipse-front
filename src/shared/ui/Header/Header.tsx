import { Layout, Space, Avatar, Dropdown, Typography } from "antd";
import { SettingOutlined, MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/app/store/hooks";
import { selectCurrentUser } from "@/entities/User";
import { ROUTES } from "@/shared/config/routes";
import { NAV_ITEMS } from "@/shared/config/navigation";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile";
import { useSelectedNavKey } from "@/shared/lib/hooks/useSelectedNavKey";
import { truncate } from "@/shared/lib/string/truncate";

import styles from "./Header.module.scss";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export const Header = () => {
  const user = useAppSelector(selectCurrentUser);
  const isMobile = useIsMobile();
  const selectedKey = useSelectedNavKey();
  const { t } = useTranslation();

  const displayName =
    user?.username ?? user?.email?.charAt(0).toUpperCase() ?? "?";

  const avatar = user?.avatar ? (
    <Avatar src={user.avatar} size={32} alt={displayName} />
  ) : (
    <Avatar size={32} className={styles.avatarFallback}>
      {displayName.charAt(0).toUpperCase()}
    </Avatar>
  );

  const menuItems = NAV_ITEMS.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: <Link to={item.key}>{t(item.labelKey)}</Link>,
  }));

  return (
    <AntHeader className={styles.header}>
      <Text className={styles.brand}>ELLIPSE</Text>
      <Space size="middle" className={styles.userSection}>
        {avatar}
        <Text className={styles.userName}>{truncate(displayName)}</Text>
        <Link to={ROUTES.private.settings} aria-label={t("nav.settings")}>
          <SettingOutlined className={styles.icon} />
        </Link>
        {isMobile && (
          <Dropdown
            menu={{ items: menuItems, selectedKeys: [selectedKey] }}
            trigger={["click"]}
          >
            <MenuOutlined className={styles.icon} />
          </Dropdown>
        )}
      </Space>
    </AntHeader>
  );
};

export default Header;
