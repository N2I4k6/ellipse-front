import axiosInstance from "@/shared/api/axiosInstance";
import { logout } from "./userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../api/userApi";
import type { Position, User } from "../types";
import axios from 'axios';
import { AUTH_ENDPOINTS } from '@/shared/api/endpoints';

const extractErrorMessage = (error: unknown, fallback: string): string => {
  if (error && typeof error === "object" && "response" in error) {
    const err = error as { response?: { data?: { msg?: string } } };
    return err.response?.data?.msg ?? fallback;
  }
  return fallback;
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    payload: {
      email: string;
      password: string;
      username?: string;
      positionType: number;
    },
    { rejectWithValue }
  ) => {
    try {
      return await userApi.register(payload);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Ошибка регистрации"));
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await userApi.login(payload);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Ошибка входа"));
    }
  }
);

export const refreshAccessToken = createAsyncThunk<
  { accessToken: string },
  string,
  { rejectValue: string }
>('user/refreshAccessToken', async (refreshToken, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<{ accessToken: string }>(
      AUTH_ENDPOINTS.refresh,
      { refreshToken },
    );
    return data;
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, 'Ошибка обновления токена'),
    );
  }
});

export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("user/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    return await userApi.me();
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Ошибка получения данных пользователя")
    );
  }
});

export const fetchPositions = createAsyncThunk<
  Position[],
  void,
  { rejectValue: string }
>("user/fetchPositions", async (_, { rejectWithValue }) => {
  try {
    return await userApi.positions();
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Ошибка получения должностей")
    );
  }
});

export const updateUsername = createAsyncThunk<
  User,
  string | null,
  { rejectValue: string }
>("user/updateUsername", async (username, { rejectWithValue }) => {
  try {
    return await userApi.updateUsername(username);
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Ошибка обновления имени")
    );
  }
});

export const uploadAvatar = createAsyncThunk<
  User,
  File,
  { rejectValue: string }
>("user/uploadAvatar", async (file, { rejectWithValue }) => {
  try {
    return await userApi.uploadAvatar(file);
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Ошибка загрузки аватара")
    );
  }
});

export const searchUsers = createAsyncThunk<
  User[],
  { name?: string; ids?: string[] },
  { rejectValue: string }
>("user/searchUsers", async (params, { rejectWithValue }) => {
  try {
    return await userApi.searchUsers(params);
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Ошибка получения пользователей")
    );
  }
});

export const subscribeToUser = createAsyncThunk<
  string[],
  string,
  { rejectValue: string }
>("user/subscribe", async (userId, { rejectWithValue }) => {
  try {
    return await userApi.subscribe(userId);
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Ошибка подписки"));
  }
});

export const unsubscribeFromUser = createAsyncThunk<
  string[],
  string,
  { rejectValue: string }
>("user/unsubscribe", async (userId, { rejectWithValue }) => {
  try {
    return await userApi.unsubscribe(userId);
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Ошибка отписки"));
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Ошибка выхода"));
    } finally {
      dispatch(logout());
    }
  }
);
