import type { NotificationType } from '@/shared/lib/notification';

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  text: string;
  type: NotificationType;
  date: string;
}

export interface NotificationTypeItem {
  type: NotificationType;
  title: string;
}

export interface NotificationPagination {
  total: number;
  page: number;
  pages: number;
}

export interface NotificationState {
  notifications: AppNotification[];
  types: NotificationTypeItem[];
  total: number;
  page: number;
  pages: number;
  currentNotification: AppNotification | null;
  loading: boolean;
  error: string | null;
}