import { Button, Card, Space, Tag, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import type { AppNotification } from "@/entities/Notification";
import { NOTIFICATION_TYPE_META } from "@/entities/Notification";
import { dayjs } from "@/shared/lib/date/dayjs";
import styles from "./Notifications.module.scss";

const { Text } = Typography;

interface NotificationCardProps {
  notification: AppNotification;
  onDelete: (id: string) => void;
}

export const NotificationCard = ({
  notification,
  onDelete,
}: NotificationCardProps) => {
  const { t } = useTranslation();
  const meta = NOTIFICATION_TYPE_META[notification.type];

  return (
    <Card className={styles.card}>
      <div className={styles.cardRow}>
        <Space align="start" size="middle" className={styles.cardBody}>
          <span className={styles.cardIcon}>{meta.icon}</span>
          <div className={styles.cardText}>
            <Text>{notification.text}</Text>
            <div className={styles.cardMeta}>
              <Tag color={meta.color}>{t(meta.labelKey)}</Tag>
              <Text type="secondary">
                {dayjs(notification.date).format("DD.MM.YYYY HH:mm")}
              </Text>
            </div>
          </div>
        </Space>

        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(notification.id)}
          aria-label={t("common.delete")}
        />
      </div>
    </Card>
  );
};

export default NotificationCard;
