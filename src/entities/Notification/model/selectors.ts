import type { RootState } from "@/app/store";

export const selectNotifications = (state: RootState) =>
  state.notification.notifications;
export const selectNotificationTypes = (state: RootState) =>
  state.notification.types;
export const selectCurrentNotification = (state: RootState) =>
  state.notification.currentNotification;
export const selectNotificationPagination = (state: RootState) => ({
  total: state.notification.total,
  page: state.notification.page,
  pages: state.notification.pages,
});
export const selectNotificationLoading = (state: RootState) =>
  state.notification.loading;
export const selectNotificationError = (state: RootState) =>
  state.notification.error;
