import axiosInstance from '@/shared/api/axiosInstance';
import { AUTH_ENDPOINTS, FILE_ENDPOINTS } from '@/shared/api/endpoints';
import { buildAvatarUrl } from '@/shared/lib/buildAvatarUrl';
import type { Position, User } from '../types';

interface RawUser extends Omit<User, 'id'> {
  _id?: string;
  id?: string;
}

interface AuthResponse {
  user: RawUser;
  accessToken: string;
  refreshToken: string;
}

interface MeResponse {
  user: RawUser;
}

const normalizeUser = (raw: RawUser): User => ({
  ...raw,
  id: raw.id ?? raw._id ?? '',
  avatar: buildAvatarUrl(raw.avatar),
});

export const userApi = {
  register: async (payload: {
    email: string;
    password: string;
    username?: string;
    positionType: number;
  }): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
    const { data } = await axiosInstance.post<AuthResponse>(
      AUTH_ENDPOINTS.register,
      payload,
    );
    return { ...data, user: normalizeUser(data.user) };
  },

  login: async (payload: {
    email: string;
    password: string;
  }): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
    const { data } = await axiosInstance.post<AuthResponse>(
      AUTH_ENDPOINTS.login,
      payload,
    );
    return { ...data, user: normalizeUser(data.user) };
  },

  me: async (): Promise<User> => {
    const { data } = await axiosInstance.get<MeResponse>(AUTH_ENDPOINTS.me);
    return normalizeUser(data.user);
  },

  positions: async (): Promise<Position[]> => {
    const { data } = await axiosInstance.get<Position[]>(
      AUTH_ENDPOINTS.positions,
    );
    return data;
  },

  updateUsername: async (username: string | null): Promise<User> => {
    const { data } = await axiosInstance.put<MeResponse>(
      AUTH_ENDPOINTS.updateUsername,
      { username },
    );
    return normalizeUser(data.user);
  },

  uploadAvatar: async (file: File): Promise<User> => {
    const formData = new FormData();
    formData.append('avatar', file);
    await axiosInstance.post(FILE_ENDPOINTS.uploadAvatar, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return userApi.me();
  },

  searchUsers: async (params: {
    name?: string;
    ids?: string[];
  }): Promise<User[]> => {
    const query = new URLSearchParams();
    if (params.name) query.set('name', params.name);
    if (params.ids?.length) query.set('ids', params.ids.join(','));
    const { data } = await axiosInstance.get<RawUser[]>(
      `${AUTH_ENDPOINTS.users}${query.toString() ? `?${query}` : ''}`,
    );
    return data.map(normalizeUser);
  },

  subscribe: async (userId: string): Promise<string[]> => {
    const { data } = await axiosInstance.post<{ subscriptions: string[] }>(
      AUTH_ENDPOINTS.subscribe(userId),
      {},
    );
    return data.subscriptions;
  },

  unsubscribe: async (userId: string): Promise<string[]> => {
    const { data } = await axiosInstance.delete<{ subscriptions: string[] }>(
      AUTH_ENDPOINTS.subscribe(userId),
    );
    return data.subscriptions;
  },
};