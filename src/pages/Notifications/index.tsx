import { useCallback, useEffect } from "react";
import { Col, Divider, Input, Row, Select, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  fetchNotifications,
  fetchNotificationTypes,
  deleteNotification,
  selectNotifications,
  selectNotificationLoading,
  selectNotificationError,
  NOTIFICATION_TYPE_META,
} from "@/entities/Notification";

import { useNotificationFilters } from "./model/useNotificationFilters";
import { NotificationCard } from "./ui/NotificationCard";
import styles from "./ui/Notifications.module.scss";

const { Title, Text } = Typography;

const PAGE_SIZE = 10;

const NotificationsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(selectNotifications);
  const loading = useAppSelector(selectNotificationLoading);
  const error = useAppSelector(selectNotificationError);

  const {
    searchText,
    setSearchText,
    debouncedSearchText,
    filterType,
    setFilterType,
  } = useNotificationFilters();

  useEffect(() => {
    dispatch(fetchNotificationTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchNotifications({
        page: 1,
        limit: PAGE_SIZE,
        type: filterType,
        text: debouncedSearchText || undefined,
      })
    );
  }, [dispatch, debouncedSearchText, filterType]);

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteNotification(id));
    },
    [dispatch]
  );

  const typeOptions = Object.values(NOTIFICATION_TYPE_META).map((meta) => ({
    value: Object.entries(NOTIFICATION_TYPE_META).find(
      ([, m]) => m === meta
    )![0],
    label: t(meta.labelKey),
  }));

  return (
    <div className={styles.container}>
      <Title level={4}>{t("notifications.title")}</Title>

      <Row gutter={[16, 16]} className={styles.filters}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder={t("notifications.search")}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Select
            placeholder={t("notifications.filterType")}
            value={filterType}
            onChange={setFilterType}
            allowClear
            loading={loading}
            className={styles.select}
            options={typeOptions}
          />
        </Col>
      </Row>

      <Divider />

      <Space direction="vertical" size="middle" className={styles.list}>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onDelete={handleDelete}
          />
        ))}

        {notifications.length === 0 && !loading && (
          <Text type="secondary">{t("notifications.noNotifications")}</Text>
        )}

        {loading && <Text type="secondary">{t("common.loading")}</Text>}
        {error && <Text type="danger">{error}</Text>}
      </Space>
    </div>
  );
};

export default NotificationsPage;
