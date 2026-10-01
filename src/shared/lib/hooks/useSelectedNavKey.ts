import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "@/shared/config/navigation";

export const useSelectedNavKey = (): string => {
  const { pathname } = useLocation();

  const match = NAV_ITEMS.find((item) => {
    if (item.key === "/") return pathname === "/";
    return pathname.startsWith(item.key);
  });

  return match?.key ?? pathname;
};
