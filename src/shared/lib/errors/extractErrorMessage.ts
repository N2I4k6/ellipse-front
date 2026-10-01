interface ErrorWithResponse {
  response?: {
    data?: { msg?: string };
    status?: number;
  };
  message?: string;
}

export const extractErrorMessage = (
  error: unknown,
  fallback = "Ошибка сервера"
): string => {
  if (typeof error === "string") return error;

  const err = error as ErrorWithResponse;
  return err.response?.data?.msg ?? err.message ?? fallback;
};

export const isNetworkError = (error: unknown): boolean => {
  const err = error as ErrorWithResponse;
  return !err.response && Boolean(err.message);
};
