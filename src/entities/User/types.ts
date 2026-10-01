export type UserLevel = 'junior' | 'middle' | 'senior';

export interface UserPosition {
  title: string | null;
  type: number | null;
  level: UserLevel;
}

export interface User {
  id: string;
  email: string;
  username: string | null;
  avatar: string | null;
  position: UserPosition;
  subscriptions: string[];
}

export interface Position {
  name: string;
  type: number;
}

export interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  positions: Position[];
  searchedUsers: User[];
  subscribedUsers: User[];
  loading: boolean;
  error: string | null;
  showOnboarding: boolean;
}