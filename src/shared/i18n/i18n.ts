import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { setDayjsLocale } from "@/shared/lib/date/dayjs";

import translationEN from "./locales/en/translation.json";
import translationRU from "./locales/ru/translation.json";

export const LANGUAGES = ["en", "ru"] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "ru";

void i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      ru: { translation: translationRU },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGES,
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  });

i18next.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  setDayjsLocale(lng);
});

setDayjsLocale(i18next.language ?? DEFAULT_LANGUAGE);

export default i18next;
