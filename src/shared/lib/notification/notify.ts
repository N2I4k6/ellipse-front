import { getNotificationApi } from './api';
import type { NotificationType } from './types';

export interface OpenNotificationPayload {
  type: NotificationType;
  title: string;
  description: string;
}

export const openNotification = ({
  type,
  title,
  description,
}: OpenNotificationPayload): void => {
  const api = getNotificationApi();

  if (!api) {
    console.warn('[notification] api not initialized, dropped:', { type, title, description });
    return;
  }

  api[type]({ message: title, description });
};