export const COMPANY_PAGE_SIZE = 10;
export const COMPANY_FILTER_DEBOUNCE_MS = 300;

export const stripAt = (value: string): string =>
  value.startsWith("@") ? value.slice(1) : value;
