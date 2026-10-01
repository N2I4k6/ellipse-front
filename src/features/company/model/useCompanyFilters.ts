import { useState } from "react";
import { useDebouncedValue } from "@/shared/lib/hooks/useDebouncedValue";
import { COMPANY_FILTER_DEBOUNCE_MS, COMPANY_PAGE_SIZE } from "./constants";

export interface CompanyFilters {
  companyName?: string;
  telegramNick?: string;
  stage?: number;
  vacancyName?: string;
  status?: number;
}

interface UseCompanyFiltersResult {
  filters: CompanyFilters;
  setFilter: <K extends keyof CompanyFilters>(
    key: K,
    value: CompanyFilters[K]
  ) => void;
  resetFilters: () => void;
  debouncedFilters: CompanyFilters;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
}

export const useCompanyFilters = (): UseCompanyFiltersResult => {
  const [filters, setFilters] = useState<CompanyFilters>({});
  const [page, setPage] = useState(1);
  const debouncedFilters = useDebouncedValue(
    filters,
    COMPANY_FILTER_DEBOUNCE_MS
  );

  const setFilter = <K extends keyof CompanyFilters>(
    key: K,
    value: CompanyFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({});
    setPage(1);
  };

  return {
    filters,
    setFilter,
    resetFilters,
    debouncedFilters,
    page,
    setPage,
    pageSize: COMPANY_PAGE_SIZE,
  };
};
