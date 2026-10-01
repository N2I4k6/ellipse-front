import { Switch } from "antd";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/app/providers/ThemeContext";
import styles from "./Settings.module.scss";

const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { mode, toggleTheme } = useTheme();

  return (
    <Switch
      className={styles.styledSwitch}
      checkedChildren={t("settings.themeDark")}
      unCheckedChildren={t("settings.themeLight")}
      checked={mode === "dark"}
      onChange={toggleTheme}
    />
  );
};

export default ThemeSwitcher;
