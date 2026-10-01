import { createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "@/shared/lib/auth/tokenStorage";
import type { User, UserState } from "../types";
import {
  fetchCurrentUser,
  fetchPositions,
  loginUser,
  refreshAccessToken,
  registerUser,
  searchUsers,
  subscribeToUser,
  unsubscribeFromUser,
  updateUsername,
  uploadAvatar,
} from "./thunks";

const initialState: UserState = {
  user: null,
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
  positions: [],
  searchedUsers: [],
  subscribedUsers: [],
  loading: false,
  error: null,
  showOnboarding: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.positions = [];
      state.searchedUsers = [];
      state.subscribedUsers = [];
      state.showOnboarding = false;
      clearTokens();
    },
    setSearchedUsers: (state, action: PayloadAction<User[]>) => {
      state.searchedUsers = action.payload;
    },
    setSubscribedUsers: (state, action: PayloadAction<User[]>) => {
      state.subscribedUsers = action.payload;
    },
    hideOnboarding: (state) => {
      state.showOnboarding = false;
    },
    openOnboarding: (state) => {
      state.showOnboarding = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.showOnboarding = true;
        setTokens({
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        });
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        setTokens({
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        });
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        setTokens({ accessToken: action.payload.accessToken });
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.loading = false;
        state.positions = action.payload;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(subscribeToUser.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) state.user.subscriptions = action.payload;
      })
      .addCase(unsubscribeFromUser.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) state.user.subscriptions = action.payload;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        const { name, ids } = action.meta.arg;
        if (name) state.searchedUsers = action.payload;
        else if (ids) state.subscribedUsers = action.payload;
      });

    builder.addMatcher(
      isAnyOf(
        registerUser.pending,
        loginUser.pending,
        fetchCurrentUser.pending,
        fetchPositions.pending,
        updateUsername.pending,
        uploadAvatar.pending,
        searchUsers.pending,
        subscribeToUser.pending,
        unsubscribeFromUser.pending
      ),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );

    builder.addMatcher(
      isAnyOf(
        registerUser.rejected,
        loginUser.rejected,
        fetchCurrentUser.rejected,
        fetchPositions.rejected,
        updateUsername.rejected,
        uploadAvatar.rejected,
        searchUsers.rejected,
        subscribeToUser.rejected,
        unsubscribeFromUser.rejected,
        refreshAccessToken.rejected
      ),
      (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Неизвестная ошибка";
      }
    );
  },
});

export const {
  logout,
  setSearchedUsers,
  setSubscribedUsers,
  hideOnboarding,
  openOnboarding,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
