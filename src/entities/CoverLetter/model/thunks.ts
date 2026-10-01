import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "@/shared/lib/errors";
import { coverLetterApi } from "../api/coverLetterApi";
import type {
  CoverLetter,
  GenerateCoverLetterPayload,
  GetCoverLettersParams,
} from "../types";

export const generateCoverLetter = createAsyncThunk<
  CoverLetter,
  GenerateCoverLetterPayload,
  { rejectValue: string }
>("coverLetter/generate", async (payload, { rejectWithValue }) => {
  try {
    return await coverLetterApi.generate(payload);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, "Ошибка генерации письма"));
  }
});

export const fetchCoverLetters = createAsyncThunk<
  { letters: CoverLetter[]; total: number; page: number; pages: number },
  GetCoverLettersParams,
  { rejectValue: string }
>("coverLetter/fetchAll", async (params, { rejectWithValue }) => {
  try {
    return await coverLetterApi.getAll(params);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, "Ошибка получения писем"));
  }
});
