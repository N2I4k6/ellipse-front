import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "@/shared/lib/errors";
import { statisticsApi } from "../api/statisticsApi";
import type { AddResponsePayload, Statistics } from "../types";

export const fetchStatistics = createAsyncThunk<
  Statistics,
  void,
  { rejectValue: string }
>("statistics/fetch", async (_, { rejectWithValue }) => {
  try {
    return await statisticsApi.get();
  } catch (e) {
    return rejectWithValue(
      extractErrorMessage(e, "Ошибка получения статистики")
    );
  }
});

export const addResponse = createAsyncThunk<
  Statistics,
  AddResponsePayload,
  { rejectValue: string }
>("statistics/addResponse", async (payload, { rejectWithValue }) => {
  try {
    return await statisticsApi.addResponse(payload);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, "Ошибка добавления отклика"));
  }
});
