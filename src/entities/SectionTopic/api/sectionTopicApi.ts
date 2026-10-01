import axiosInstance from "@/shared/api/axiosInstance";
import { SECTION_ENDPOINTS, TOPIC_ENDPOINTS } from "@/shared/api/endpoints";
import type {
  CreateSectionPayload,
  CreateTopicPayload,
  GetSectionsParams,
  Section,
  Topic,
} from "../types";

interface RawSection extends Omit<Section, "id"> {
  _id: string;
}
interface RawTopic extends Omit<Topic, "id"> {
  _id: string;
}

interface SectionsResponse {
  sections: RawSection[];
  total: number;
  page: number;
  pages: number;
}

const normalizeSection = (raw: RawSection): Section => ({
  ...raw,
  id: raw._id,
});
const normalizeTopic = (raw: RawTopic): Topic => ({ ...raw, id: raw._id });

export const sectionTopicApi = {
  getSections: async (params: GetSectionsParams) => {
    const { data } = await axiosInstance.get<SectionsResponse>(
      SECTION_ENDPOINTS.base,
      {
        params,
      }
    );
    return { ...data, sections: data.sections.map(normalizeSection) };
  },

  getSectionById: async (id: string): Promise<Section> => {
    const { data } = await axiosInstance.get<RawSection>(
      SECTION_ENDPOINTS.byId(id)
    );
    return normalizeSection(data);
  },

  createSection: async (payload: CreateSectionPayload): Promise<Section> => {
    const { data } = await axiosInstance.post<RawSection>(
      SECTION_ENDPOINTS.base,
      payload
    );
    return normalizeSection(data);
  },

  updateSection: async (
    id: string,
    payload: Partial<Section>
  ): Promise<Section> => {
    const { data } = await axiosInstance.put<RawSection>(
      SECTION_ENDPOINTS.byId(id),
      payload
    );
    return normalizeSection(data);
  },

  deleteSection: async (id: string): Promise<string> => {
    await axiosInstance.delete(SECTION_ENDPOINTS.byId(id));
    return id;
  },

  getTopicById: async (id: string): Promise<Topic> => {
    const { data } = await axiosInstance.get<RawTopic>(
      TOPIC_ENDPOINTS.byId(id)
    );
    return normalizeTopic(data);
  },

  createTopic: async (payload: CreateTopicPayload): Promise<Topic> => {
    const { data } = await axiosInstance.post<RawTopic>(
      TOPIC_ENDPOINTS.base,
      payload
    );
    return normalizeTopic(data);
  },

  updateTopic: async (id: string, payload: Partial<Topic>): Promise<Topic> => {
    const { data } = await axiosInstance.put<RawTopic>(
      TOPIC_ENDPOINTS.byId(id),
      payload
    );
    return normalizeTopic(data);
  },

  deleteTopic: async (id: string): Promise<string> => {
    await axiosInstance.delete(TOPIC_ENDPOINTS.byId(id));
    return id;
  },
};
