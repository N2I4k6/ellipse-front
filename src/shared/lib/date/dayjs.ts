import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/en";
import updateLocale from "dayjs/plugin/updateLocale";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(updateLocale);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

dayjs.updateLocale("ru", { weekStart: 1 });
dayjs.updateLocale("en", { weekStart: 1 });

export const setDayjsLocale = (lang: string): void => {
  dayjs.locale(lang.startsWith("ru") ? "ru" : "en");
};

export { dayjs };
