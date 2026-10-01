import { useState } from "react";
import { useDebouncedValue } from "@/shared/lib/hooks/useDebouncedValue";
import type { NotificationType } from "@/shared/lib/notification";

interface UseNotificationFiltersResult {
  searchText: string;
  setSearchText: (value: string) => void;
  debouncedSearchText: string;
  filterType: NotificationType | undefined;
  setFilterType: (value: NotificationType | undefined) => void;
  reset: () => void;
}

const SEARCH_DEBOUNCE_MS = 300;

export const useNotificationFilters = (): UseNotificationFiltersResult => {
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState<NotificationType | undefined>();

  const debouncedSearchText = useDebouncedValue(searchText, SEARCH_DEBOUNCE_MS);

  const reset = () => {
    setSearchText("");
    setFilterType(undefined);
  };

  return {
    searchText,
    setSearchText,
    debouncedSearchText,
    filterType,
    setFilterType,
    reset,
  };
};
