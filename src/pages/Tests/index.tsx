import SectionsCollapse from "@/shared/ui/SectionsCollapse";
import { useTranslation } from "react-i18next";

const TestsPage = () => {
  const { t } = useTranslation();

  return <SectionsCollapse title={t("study.tests")} page="tests" />;
};

export default TestsPage;
