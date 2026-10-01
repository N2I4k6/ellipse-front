import type { RootState } from '@/app/store';

export const selectCoverLetters = (state: RootState) =>
  state.coverLetter.letters;

export const selectCurrentCoverLetter = (state: RootState) =>
  state.coverLetter.currentLetter;

export const selectCoverLetterPagination = (state: RootState) => ({
  total: state.coverLetter.total,
  page: state.coverLetter.page,
  pages: state.coverLetter.pages,
});

export const selectCoverLetterLoading = (state: RootState) =>
  state.coverLetter.loading;

export const selectCoverLetterError = (state: RootState) =>
  state.coverLetter.error;

export const selectLatestGeneratedLetter = (state: RootState): string | null => {
  const letters = state.coverLetter.letters;
  return letters.length > 0 ? letters[letters.length - 1].generatedLetter : null;
};