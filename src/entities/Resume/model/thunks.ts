import { createAsyncThunk } from '@reduxjs/toolkit';
import { extractErrorMessage } from '@/shared/lib/errors';
import { resumeApi } from '../api/resumeApi';
import type { Education, Experience, Resume, ResumeOptions } from '../types';

export const fetchResumeOptions = createAsyncThunk<ResumeOptions, void, { rejectValue: string }>(
  'resume/fetchOptions',
  async (_, { rejectWithValue }) => {
    try {
      return await resumeApi.getOptions();
    } catch (e) {
      return rejectWithValue(extractErrorMessage(e, 'Ошибка получения опций резюме'));
    }
  },
);

export const fetchResume = createAsyncThunk<Resume | null, void, { rejectValue: string }>(
  'resume/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await resumeApi.get();
    } catch (e) {
      return rejectWithValue(extractErrorMessage(e, 'Ошибка получения резюме'));
    }
  },
);

export const updateResume = createAsyncThunk<
  Resume | null,
  Partial<Resume>,
  { rejectValue: string }
>('resume/update', async (payload, { rejectWithValue }) => {
  try {
    return await resumeApi.update(payload);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, 'Ошибка обновления резюме'));
  }
});

export const uploadResumePhoto = createAsyncThunk<
  Resume | null,
  File,
  { rejectValue: string }
>('resume/uploadPhoto', async (file, { rejectWithValue }) => {
  try {
    return await resumeApi.uploadPhoto(file);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, 'Ошибка загрузки фото'));
  }
});

export const updateExperience = createAsyncThunk<
  Resume | null,
  { index: number; data: Experience },
  { rejectValue: string }
>('resume/updateExperience', async ({ index, data }, { rejectWithValue }) => {
  try {
    return await resumeApi.updateExperience(index, data);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, 'Ошибка обновления опыта'));
  }
});

export const deleteExperience = createAsyncThunk<Resume | null, number, { rejectValue: string }>(
  'resume/deleteExperience',
  async (index, { rejectWithValue }) => {
    try {
      return await resumeApi.deleteExperience(index);
    } catch (e) {
      return rejectWithValue(extractErrorMessage(e, 'Ошибка удаления опыта'));
    }
  },
);

export const updateEducation = createAsyncThunk<
  Resume | null,
  { index: number; data: Education },
  { rejectValue: string }
>('resume/updateEducation', async ({ index, data }, { rejectWithValue }) => {
  try {
    return await resumeApi.updateEducation(index, data);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, 'Ошибка обновления образования'));
  }
});

export const deleteEducation = createAsyncThunk<Resume | null, number, { rejectValue: string }>(
  'resume/deleteEducation',
  async (index, { rejectWithValue }) => {
    try {
      return await resumeApi.deleteEducation(index);
    } catch (e) {
      return rejectWithValue(extractErrorMessage(e, 'Ошибка удаления образования'));
    }
  },
);