import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { LANGUAGES, type Language } from "@/shared/i18n";
import styles from "./Settings.module.scss";

const LANGUAGE_LABELS: Record<Language, string> = {
  ru: "Русский",
  en: "English",
};

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleChange = (value: Language) => {
    void i18n.changeLanguage(value);
  };

  return (
    <Select<Language>
      className={styles.styledSelect}
      value={i18n.language as Language}
      placeholder={t("settings.languagePlaceholder")}
      onChange={handleChange}
      options={LANGUAGES.map((lang) => ({
        value: lang,
        label: LANGUAGE_LABELS[lang],
      }))}
    />
  );
};

export default LanguageSwitcher;
