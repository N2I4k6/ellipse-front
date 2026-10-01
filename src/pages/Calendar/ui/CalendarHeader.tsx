import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import type { Dayjs } from "dayjs";

import styles from "./Calendar.module.scss";

interface CalendarHeaderProps {
  value: Dayjs;
  onChange: (value: Dayjs) => void;
}

export const CalendarHeader = ({ value, onChange }: CalendarHeaderProps) => {
  const { t, i18n } = useTranslation();

  const locale = i18n.language.startsWith("ru") ? "ru" : "en";

  return (
    <div className={styles.header}>
      <Button
        icon={<LeftOutlined />}
        onClick={() => onChange(value.subtract(1, "month"))}
        aria-label={t("common.prev")}
      />
      <span className={styles.headerTitle}>
        {value.locale(locale).format("MMMM YYYY")}
      </span>
      <Button
        icon={<RightOutlined />}
        onClick={() => onChange(value.add(1, "month"))}
        aria-label={t("common.next")}
      />
    </div>
  );
};
