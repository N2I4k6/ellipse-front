import { createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "@/shared/lib/errors";
import { sectionTopicApi } from "../api/sectionTopicApi";
import type {
  CreateSectionPayload,
  CreateTopicPayload,
  GetSectionsParams,
  Section,
  Topic,
} from "../types";

const ERR = {
  sections: "Ошибка получения разделов",
  createSection: "Ошибка создания раздела",
  section: "Ошибка получения раздела",
  updateSection: "Ошибка обновления раздела",
  deleteSection: "Ошибка удаления раздела",
  createTopic: "Ошибка создания темы",
  topic: "Ошибка получения темы",
  updateTopic: "Ошибка обновления темы",
  deleteTopic: "Ошибка удаления темы",
};

export const fetchSections = createAsyncThunk<
  { sections: Section[]; total: number; page: number; pages: number },
  GetSectionsParams,
  { rejectValue: string }
>("sectionTopic/fetchSections", async (params, { rejectWithValue }) => {
  try {
    return await sectionTopicApi.getSections(params);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, ERR.sections));
  }
});

export const fetchSectionById = createAsyncThunk<
  Section,
  string,
  { rejectValue: string }
>("sectionTopic/fetchSectionById", async (id, { rejectWithValue }) => {
  try {
    return await sectionTopicApi.getSectionById(id);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, ERR.section));
  }
});

export const createSection = createAsyncThunk<
  Section,
  CreateSectionPayload,
  { rejectValue: string }
>("sectionTopic/createSection", async (payload, { rejectWithValue }) => {
  try {
    return await sectionTopicApi.createSection(payload);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, ERR.createSection));
  }
});

export const updateSection = createAsyncThunk<
  Section,
  { id: string; data: Partial<Section> },
  { rejectValue: string }
>("sectionTopic/updateSection", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await sectionTopicApi.updateSection(id, data);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, ERR.updateSection));
  }
});

export const deleteSection = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("sectionTopic/deleteSection", async (id, { rejectWithValue }) => {
  try {
    return await sectionTopicApi.deleteSection(id);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, ERR.deleteSection));
  }
});

export const fetchTopicById = createAsyncThunk<
  Topic,
  string,
  { rejectValue: string }
>("sectionTopic/fetchTopicById", async (id, { rejectWithValue }) => {
  try {
    return await sectionTopicApi.getTopicById(id);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, ERR.topic));
  }
});

export const createTopic = createAsyncThunk<
  Topic,
  CreateTopicPayload,
  { rejectValue: string }
>("sectionTopic/createTopic", async (payload, { rejectWithValue }) => {
  try {
    return await sectionTopicApi.createTopic(payload);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, ERR.createTopic));
  }
});

export const updateTopic = createAsyncThunk<
  Topic,
  { id: string; data: Partial<Topic> },
  { rejectValue: string }
>("sectionTopic/updateTopic", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await sectionTopicApi.updateTopic(id, data);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, ERR.updateTopic));
  }
});

export const deleteTopic = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("sectionTopic/deleteTopic", async (id, { rejectWithValue }) => {
  try {
    return await sectionTopicApi.deleteTopic(id);
  } catch (e) {
    return rejectWithValue(extractErrorMessage(e, ERR.deleteTopic));
  }
});
