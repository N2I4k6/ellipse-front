import SectionsCollapse from "@/shared/ui/SectionsCollapse";
import { useTranslation } from "react-i18next";

const DocumentationPage = () => {
  const { t } = useTranslation();

  return (
    <SectionsCollapse title={t("study.documentation")} page="documentation" />
  );
};

export default DocumentationPage;
