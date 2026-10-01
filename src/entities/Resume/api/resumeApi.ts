import axiosInstance from '@/shared/api/axiosInstance';
import { RESUME_ENDPOINTS } from '@/shared/api/endpoints';
import { buildAvatarUrl } from '@/shared/lib/buildAvatarUrl';
import type { Education, Experience, Resume, ResumeOptions } from '../types';

const normalizeResume = (resume: Resume | null): Resume | null =>
  resume ? { ...resume, photo: buildAvatarUrl(resume.photo) ?? undefined } : null;

export const resumeApi = {
  getOptions: async (): Promise<ResumeOptions> => {
    const { data } = await axiosInstance.get<ResumeOptions>(RESUME_ENDPOINTS.options);
    return data;
  },

  get: async (): Promise<Resume | null> => {
    const { data } = await axiosInstance.get<{ resume: Resume | null }>(RESUME_ENDPOINTS.base);
    return normalizeResume(data.resume);
  },

  update: async (payload: Partial<Resume>): Promise<Resume | null> => {
    const { data } = await axiosInstance.post<{ resume: Resume | null }>(
      RESUME_ENDPOINTS.base,
      payload,
    );
    return normalizeResume(data.resume);
  },

  uploadPhoto: async (file: File): Promise<Resume | null> => {
    const formData = new FormData();
    formData.append('photo', file);
    const { data } = await axiosInstance.post<{ resume: Resume | null }>(
      RESUME_ENDPOINTS.uploadPhoto,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return normalizeResume(data.resume);
  },

  updateExperience: async (index: number, payload: Experience): Promise<Resume | null> => {
    const { data } = await axiosInstance.put<{ resume: Resume | null }>(
      RESUME_ENDPOINTS.experience(index),
      payload,
    );
    return normalizeResume(data.resume);
  },

  deleteExperience: async (index: number): Promise<Resume | null> => {
    const { data } = await axiosInstance.delete<{ resume: Resume | null }>(
      RESUME_ENDPOINTS.experience(index),
    );
    return normalizeResume(data.resume);
  },

  updateEducation: async (index: number, payload: Education): Promise<Resume | null> => {
    const { data } = await axiosInstance.put<{ resume: Resume | null }>(
      RESUME_ENDPOINTS.education(index),
      payload,
    );
    return normalizeResume(data.resume);
  },

  deleteEducation: async (index: number): Promise<Resume | null> => {
    const { data } = await axiosInstance.delete<{ resume: Resume | null }>(
      RESUME_ENDPOINTS.education(index),
    );
    return normalizeResume(data.resume);
  },
};