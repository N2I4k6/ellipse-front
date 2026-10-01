import type { NotificationInstance } from 'antd/es/notification/interface';

let api: NotificationInstance | null = null;

export const setNotificationApi = (instance: NotificationInstance): void => {
  api = instance;
};

export const getNotificationApi = (): NotificationInstance | null => api;