import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "@/shared/lib/errors";
import { testApi } from "../api/testApi";
import type {
  CreateTestPayload,
  GetTestsParams,
  RateLimitError,
  Test,
  TestAnswer,
  TestResult,
} from "../types";

export const fetchTests = createAsyncThunk<
  { tests: Test[]; total: number; page: number; pages: number },
  GetTestsParams,
  { rejectValue: string }
>("test/fetchAll", async (params, { rejectWithValue }) => {
  try {
    return await testApi.getTests(params);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, "Ошибка получения тестов"));
  }
});

export const fetchTestById = createAsyncThunk<
  Test,
  string,
  { rejectValue: string }
>("test/fetchById", async (id, { rejectWithValue }) => {
  try {
    return await testApi.getTestById(id);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, "Ошибка получения теста"));
  }
});

export const fetchGeneralTest = createAsyncThunk<
  Test | null,
  void,
  { rejectValue: string }
>("test/fetchGeneral", async (_, { rejectWithValue }) => {
  try {
    return await testApi.getGeneralTest();
  } catch (e) {
    return rejectWithValue(
      extractErrorMessage(e, "Ошибка получения общего теста")
    );
  }
});

export const createTest = createAsyncThunk<
  Test,
  CreateTestPayload,
  { rejectValue: string }
>("test/create", async (payload, { rejectWithValue }) => {
  try {
    return await testApi.createTest(payload);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, "Ошибка создания теста"));
  }
});

export const submitTestAnswers = createAsyncThunk<
  TestResult,
  { id: string; answers: TestAnswer[] },
  { rejectValue: string }
>("test/submit", async ({ id, answers }, { rejectWithValue }) => {
  try {
    return await testApi.submitAnswers(id, answers);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, "Ошибка отправки ответов"));
  }
});

export const fetchTestResults = createAsyncThunk<
  TestResult[],
  string,
  { rejectValue: string }
>("test/fetchResults", async (id, { rejectWithValue }) => {
  try {
    return await testApi.getResults(id);
  } catch (e) {
    return rejectWithValue(
      extractErrorMessage(e, "Ошибка получения результатов")
    );
  }
});

export const deleteTestResults = createAsyncThunk<
  void,
  string,
  { rejectValue: RateLimitError | string }
>("test/deleteResults", async (id, { rejectWithValue }) => {
  try {
    await testApi.deleteResults(id);
  } catch (e) {
    const err = e as {
      response?: { status?: number; data?: { msg?: string } };
    };

    if (err.response?.status === 429) {
      const msg = err.response.data?.msg ?? "Нельзя удалить результаты теста";
      const match = msg.match(/Пожалуйста, подождите (\d+) минут/);
      const remainingMinutes = match ? parseInt(match[1], 10) : 5;

      return rejectWithValue({ msg, remainingMinutes });
    }

    return rejectWithValue(
      extractErrorMessage(e, "Ошибка удаления результатов")
    );
  }
});
