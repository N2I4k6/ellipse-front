import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { openNotification, NotificationType } from "@/shared/lib/notification";

const IGNORED_ACTIONS = ["user/fetchCurrentUser/rejected"];

export const notificationMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const actionType = action.type as string;
    if (IGNORED_ACTIONS.includes(actionType)) {
      return next(action);
    }

    const payload = action.payload;
    const message =
      typeof payload === "string"
        ? payload
        : (payload as { msg?: string })?.msg ?? "Неизвестная ошибка";

    openNotification({
      type: NotificationType.Error,
      title: "Ошибка",
      description: message,
    });
  }
  return next(action);
};
