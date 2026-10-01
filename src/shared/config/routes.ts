export const ROUTES = {
  root: '/',
  login: '/login',
  register: '/register',

  private: {
    statistics: '/',
    companies: '/companies',
    study: '/study',
    settings: '/settings',
    coverLetter: '/cover-letter',
    calendar: '/calendar',
    resume: '/resume',
    notifications: '/notifications',
    messages: '/messages',
    documentation: '/study/documentation',
    documentationTopic: (id: string | number) => `/study/documentation/${id}`,
    tests: '/study/tests',
    test: (id: string | number) => `/study/tests/${id}`,
    generalTest: '/study/general-test',
  },
} as const;