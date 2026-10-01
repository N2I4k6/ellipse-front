import type { RootState } from "@/app/store";

export const selectResume = (state: RootState) => state.resume.resume;
export const selectResumeOptions = (state: RootState) => state.resume.options;
export const selectResumeLoading = (state: RootState) => state.resume.loading;
export const selectResumeError = (state: RootState) => state.resume.error;
