import type { Resume } from "@/entities/Resume";
import { dayjs } from "@/shared/lib/date/dayjs";
import type { ResumeFormValues } from "./schema";

export const toFormValues = (resume: Resume | null): ResumeFormValues => {
  if (!resume) return getEmptyFormValues();

  return {
    ...resume,
    birthDate: resume.birthDate
      ? dayjs(resume.birthDate).format("YYYY-MM-DD")
      : null,
    skills: resume.skills ?? [],
    experience: resume.experience.map((exp) => ({
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
    })),
    education: resume.education ?? [],
  };
};

export const toApiPayload = (values: ResumeFormValues): Partial<Resume> => ({
  ...values,
  birthDate: values.birthDate ? dayjs(values.birthDate).toISOString() : null,
  experience: values.experience.map((exp) => ({
    ...exp,
    startDate: exp.startDate ? dayjs(exp.startDate).toISOString() : "",
    endDate: exp.endDate ? dayjs(exp.endDate).toISOString() : undefined,
  })),
});

export const getEmptyFormValues = (): ResumeFormValues => ({
  position: "",
  workSchedule: 0,
  employmentType: 0,
  firstName: "",
  lastName: "",
  middleName: "",
  birthDate: null,
  gender: 0,
  city: "",
  phone: "",
  email: "",
  telegram: "",
  whatsapp: "",
  about: "",
  skills: [],
  experience: [],
  education: [],
  linkedin: "",
  businessTripReadiness: false,
});
