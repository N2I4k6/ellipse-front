import axiosInstance from '@/shared/api/axiosInstance';
import { NOTIFICATION_ENDPOINTS } from '@/shared/api/endpoints';
import type { AppNotification, NotificationTypeItem } from '../types';
import type { NotificationType } from '@/shared/lib/notification';

interface RawNotification extends Omit<AppNotification, 'id'> {
  _id: string;
}

interface NotificationsResponse {
  notifications: RawNotification[];
  total: number;
  page: number;
  pages: number;
}

const normalize = (raw: RawNotification): AppNotification => ({
  ...raw,
  id: raw._id,
});

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
  type?: NotificationType;
  text?: string;
}

export const notificationApi = {
  getTypes: async (): Promise<NotificationTypeItem[]> => {
    const { data } = await axiosInstance.get<NotificationTypeItem[]>(
      NOTIFICATION_ENDPOINTS.types,
    );
    return data;
  },

  getAll: async (params: GetNotificationsParams) => {
    const { data } = await axiosInstance.get<NotificationsResponse>(
      NOTIFICATION_ENDPOINTS.base,
      { params },
    );
    return {
      ...data,
      notifications: data.notifications.map(normalize),
    };
  },

  getById: async (id: string): Promise<AppNotification> => {
    const { data } = await axiosInstance.get<RawNotification>(
      NOTIFICATION_ENDPOINTS.byId(id),
    );
    return normalize(data);
  },

  create: async (payload: {
    title: string;
    text: string;
    type: NotificationType;
    date?: string;
  }): Promise<AppNotification> => {
    const { data } = await axiosInstance.post<RawNotification>(
      NOTIFICATION_ENDPOINTS.base,
      payload,
    );
    return normalize(data);
  },

  update: async (id: string, data: Partial<AppNotification>): Promise<AppNotification> => {
    const { data: updated } = await axiosInstance.put<RawNotification>(
      NOTIFICATION_ENDPOINTS.byId(id),
      data,
    );
    return normalize(updated);
  },

  remove: async (id: string): Promise<string> => {
    await axiosInstance.delete(NOTIFICATION_ENDPOINTS.byId(id));
    return id;
  },
};