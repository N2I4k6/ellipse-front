import jsPDF from "jspdf";
import type { TFunction } from "i18next";
import type { ResumeOptions } from "@/entities/Resume";
import { dayjs } from "@/shared/lib/date/dayjs";
import type { ResumeFormValues } from "./schema";

const PAGE_MARGIN = 10;
const LINE_HEIGHT = 7;
const MAX_WIDTH = 180;

const safeText = (value: string | null | undefined, fallback: string): string =>
  value && value.trim() ? value : fallback;

export const exportResume = async (
  data: ResumeFormValues,
  options: ResumeOptions | null,
  t: TFunction
): Promise<void> => {
  const doc = new jsPDF();
  doc.setFontSize(18);

  const fallback = t("common.notSpecified");

  const findLabel = (
    list: { label: string; value: number }[] | undefined,
    value: number | undefined
  ): string => {
    const found = list?.find((o) => o.value === value);
    return found ? t(found.label) : fallback;
  };

  let y = PAGE_MARGIN;

  const writeLine = (text: string, size = 12) => {
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, MAX_WIDTH);
    doc.text(lines, PAGE_MARGIN, y);
    y += LINE_HEIGHT * lines.length;
  };

  const name = [data.firstName, data.lastName, data.middleName]
    .filter(Boolean)
    .join(" ");
  writeLine(safeText(name, fallback), 18);

  writeLine(
    `${t("resume.fields.position")}: ${safeText(data.position, fallback)}`
  );
  writeLine(
    `${t("resume.fields.workSchedule")}: ${findLabel(
      options?.workSchedules,
      data.workSchedule
    )}`
  );
  writeLine(
    `${t("resume.fields.employmentType")}: ${findLabel(
      options?.employmentTypes,
      data.employmentType
    )}`
  );
  writeLine(
    `${t("resume.fields.birthDate")}: ${
      data.birthDate ? dayjs(data.birthDate).format("DD.MM.YYYY") : fallback
    }`
  );
  writeLine(
    `${t("resume.fields.gender")}: ${findLabel(options?.genders, data.gender)}`
  );
  writeLine(`${t("resume.fields.city")}: ${safeText(data.city, fallback)}`);

  writeLine(t("resume.sections.contacts"), 14);
  writeLine(`${t("resume.fields.phone")}: ${safeText(data.phone, fallback)}`);
  writeLine(`${t("resume.fields.email")}: ${safeText(data.email, fallback)}`);
  writeLine(
    `${t("resume.fields.telegram")}: ${safeText(data.telegram, fallback)}`
  );
  writeLine(
    `${t("resume.fields.whatsapp")}: ${safeText(data.whatsapp, fallback)}`
  );

  writeLine(t("resume.sections.experience"), 14);
  if (!data.experience.length) {
    writeLine(fallback);
  } else {
    for (const exp of data.experience) {
      writeLine(
        `${exp.company} - ${exp.position} (${dayjs(exp.startDate).format(
          "MM.YYYY"
        )} - ${
          exp.endDate
            ? dayjs(exp.endDate).format("MM.YYYY")
            : t("common.present")
        })`
      );
      if (exp.description) writeLine(exp.description);
    }
  }

  doc.save("resume.pdf");
};
