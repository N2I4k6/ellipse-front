import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "@/shared/lib/errors";
import {
  notificationApi,
  type GetNotificationsParams,
} from "../api/notificationApi";
import type { AppNotification, NotificationTypeItem } from "../types";
import type { NotificationType } from "@/shared/lib/notification";

export const fetchNotificationTypes = createAsyncThunk<
  NotificationTypeItem[],
  void,
  { rejectValue: string }
>("notification/fetchTypes", async (_, { rejectWithValue }) => {
  try {
    return await notificationApi.getTypes();
  } catch (e) {
    return rejectWithValue(
      extractErrorMessage(e, "Ошибка получения типов уведомлений")
    );
  }
});

export const fetchNotifications = createAsyncThunk<
  {
    notifications: AppNotification[];
    total: number;
    page: number;
    pages: number;
  },
  GetNotificationsParams,
  { rejectValue: string }
>("notification/fetchAll", async (params, { rejectWithValue }) => {
  try {
    return await notificationApi.getAll(params);
  } catch (e) {
    return rejectWithValue(
      extractErrorMessage(e, "Ошибка получения уведомлений")
    );
  }
});

export const fetchNotificationById = createAsyncThunk<
  AppNotification,
  string,
  { rejectValue: string }
>("notification/fetchById", async (id, { rejectWithValue }) => {
  try {
    return await notificationApi.getById(id);
  } catch (e) {
    return rejectWithValue(
      extractErrorMessage(e, "Ошибка получения уведомления")
    );
  }
});

export const createNotification = createAsyncThunk<
  AppNotification,
  { title: string; text: string; type: NotificationType; date?: string },
  { rejectValue: string }
>("notification/create", async (data, { rejectWithValue }) => {
  try {
    return await notificationApi.create(data);
  } catch (e) {
    return rejectWithValue(
      extractErrorMessage(e, "Ошибка создания уведомления")
    );
  }
});

export const updateNotification = createAsyncThunk<
  AppNotification,
  { id: string; data: Partial<AppNotification> },
  { rejectValue: string }
>("notification/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await notificationApi.update(id, data);
  } catch (e) {
    return rejectWithValue(
      extractErrorMessage(e, "Ошибка обновления уведомления")
    );
  }
});

export const deleteNotification = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("notification/delete", async (id, { rejectWithValue }) => {
  try {
    return await notificationApi.remove(id);
  } catch (e) {
    return rejectWithValue(
      extractErrorMessage(e, "Ошибка удаления уведомления")
    );
  }
});
