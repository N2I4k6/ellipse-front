import type { RootState } from '@/app/store';

export const selectUserState = (state: RootState) => state.user;
export const selectCurrentUser = (state: RootState) => state.user.user;
export const selectAccessToken = (state: RootState) => state.user.accessToken;
export const selectIsAuthenticated = (state: RootState): boolean =>
  Boolean(state.user.accessToken);
export const selectShowOnboarding = (state: RootState) => state.user.showOnboarding;
export const selectPositions = (state: RootState) => state.user.positions;
export const selectSearchedUsers = (state: RootState) => state.user.searchedUsers;
export const selectSubscribedUsers = (state: RootState) => state.user.subscribedUsers;
export const selectUserLoading = (state: RootState) => state.user.loading;