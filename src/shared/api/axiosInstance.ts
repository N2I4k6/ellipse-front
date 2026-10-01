import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "@/shared/lib/auth/tokenStorage";
import { AUTH_ENDPOINTS } from "@/shared/api/endpoints";

const API_URL = import.meta.env.VITE_API_URL ?? "";
const BASE_URL = API_URL.endsWith("/api") ? API_URL : `${API_URL}/api`;

interface AuthCallbacks {
  onRefreshSuccess?: (accessToken: string) => void;
  onAuthFailure?: () => void;
}

let authCallbacks: AuthCallbacks = {};

export const registerAuthCallbacks = (callbacks: AuthCallbacks): void => {
  authCallbacks = callbacks;
};

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers["x-auth-token"] = token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryableRequest | undefined;

    const isRefreshCall = original?.url?.includes(AUTH_ENDPOINTS.refresh);

    if (
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !isRefreshCall
    ) {
      original._retry = true;

      const refreshTokenValue = getRefreshToken();
      if (!refreshTokenValue) {
        authCallbacks.onAuthFailure?.();
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post<{ accessToken: string }>(
          `${BASE_URL}${AUTH_ENDPOINTS.refresh}`,
          { refreshToken: refreshTokenValue }
        );

        setTokens({
          accessToken: data.accessToken,
          refreshToken: refreshTokenValue,
        });
        authCallbacks.onRefreshSuccess?.(data.accessToken);

        if (original.headers) {
          original.headers["x-auth-token"] = data.accessToken;
        }
        return axiosInstance(original);
      } catch (refreshError) {
        clearTokens();
        authCallbacks.onAuthFailure?.();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
