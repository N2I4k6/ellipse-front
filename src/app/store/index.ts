import { configureStore } from '@reduxjs/toolkit';
import userReducer, { logout } from '@/entities/User';
import companyReducer from '@/entities/Company';
import sectionTopicReducer from '@/entities/SectionTopic';
import testReducer from '@/entities/Test';
import statisticsReducer from '@/entities/Statistics';
import coverLetterReducer from '@/entities/CoverLetter';
import resumeReducer from '@/entities/Resume';
import notificationReducer from '@/entities/Notification';
import { registerAuthCallbacks } from '@/shared/api/axiosInstance';
import { setTokens } from '@/shared/lib/auth/tokenStorage';
import { notificationMiddleware } from '@/shared/lib/redux/notificationMiddleware';

export const store = configureStore({
  reducer: {
    company: companyReducer,
    user: userReducer,
    sectionTopic: sectionTopicReducer,
    test: testReducer,
    statistics: statisticsReducer,
    coverLetter: coverLetterReducer,
    resume: resumeReducer,
    notification: notificationReducer,
  },
  middleware: (getDefault) => getDefault().concat(notificationMiddleware),
});

registerAuthCallbacks({
  onRefreshSuccess: (accessToken) => setTokens({ accessToken }),
  onAuthFailure: () => store.dispatch(logout()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { useAppDispatch, useAppSelector } from './hooks';

export default store;