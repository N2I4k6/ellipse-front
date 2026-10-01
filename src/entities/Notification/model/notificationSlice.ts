import { createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";
import type { AppNotification, NotificationState } from "../types";
import {
  createNotification,
  deleteNotification,
  fetchNotificationById,
  fetchNotifications,
  fetchNotificationTypes,
  updateNotification,
} from "./thunks";

const initialState: NotificationState = {
  notifications: [],
  types: [],
  total: 0,
  page: 1,
  pages: 1,
  currentNotification: null,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearCurrentNotification: (state) => {
      state.currentNotification = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    pushNotification: (state, action: PayloadAction<AppNotification>) => {
      state.notifications.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.types = action.payload;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchNotificationById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNotification = action.payload;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications.unshift(action.payload);
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.notifications.findIndex(
          (n) => n.id === action.payload.id
        );
        if (idx !== -1) state.notifications[idx] = action.payload;
        if (state.currentNotification?.id === action.payload.id) {
          state.currentNotification = action.payload;
        }
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.filter(
          (n) => n.id !== action.payload
        );
        if (state.currentNotification?.id === action.payload) {
          state.currentNotification = null;
        }
      });

    builder.addMatcher(
      isAnyOf(
        fetchNotificationTypes.pending,
        fetchNotifications.pending,
        fetchNotificationById.pending,
        createNotification.pending,
        updateNotification.pending,
        deleteNotification.pending
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      isAnyOf(
        fetchNotificationTypes.rejected,
        fetchNotifications.rejected,
        fetchNotificationById.rejected,
        createNotification.rejected,
        updateNotification.rejected,
        deleteNotification.rejected
      ),
      (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Неизвестная ошибка";
      }
    );
  },
});

export const { clearCurrentNotification, clearError, pushNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
