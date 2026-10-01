export const AUTH_ENDPOINTS = {
  register: "/auth/register",
  login: "/auth/login",
  refresh: "/auth/refresh-token",
  logout: "/auth/logout",
  me: "/auth/me",
  positions: "/auth/positions",
  updateUsername: "/auth/update-username",
  users: "/auth/users",
  subscribe: (userId: string) => `/auth/subscribe/${userId}`,
} as const;

export const FILE_ENDPOINTS = {
  uploadAvatar: "/files/upload-avatar",
} as const;

export const NOTIFICATION_ENDPOINTS = {
  base: "/notifications",
  types: "/notifications/types",
  byId: (id: string) => `/notifications/${id}`,
} as const;

export const COMPANY_ENDPOINTS = {
  base: "/companies",
  stages: "/companies/stages",
  statuses: "/companies/statuses",
  calendar: "/companies/calendar",
  byId: (id: string) => `/companies/${id}`,
} as const;

export const RESUME_ENDPOINTS = {
  base: "/resume",
  options: "/resume/options",
  uploadPhoto: "/resume/upload-photo",
  experience: (index: number) => `/resume/experience/${index}`,
  education: (index: number) => `/resume/education/${index}`,
} as const;

export const SECTION_ENDPOINTS = {
  base: "/sections",
  byId: (id: string) => `/sections/${id}`,
} as const;

export const TOPIC_ENDPOINTS = {
  base: "/topics",
  byId: (id: string) => `/topics/${id}`,
} as const;

export const COVER_LETTER_ENDPOINTS = {
  base: "/cover-letters",
  generate: "/cover-letters/generate",
} as const;

export const STATISTICS_ENDPOINTS = {
  base: "/statistics",
  responses: "/statistics/responses",
} as const;

export const TEST_ENDPOINTS = {
  base: "/tests",
  byId: (id: string) => `/tests/${id}`,
  submit: (id: string) => `/tests/${id}/submit`,
  results: (id: string) => `/tests/${id}/results`,
} as const;
