import * as yup from "yup";

export const companySchema = yup.object({
  companyName: yup.string().optional().nullable(),
  telegramNick: yup.string().optional().nullable(),
  stage: yup.number().required("validation.stageRequired").min(1).max(5),
  stageDate: yup
    .string()
    .required("validation.stageDateRequired")
    .typeError("validation.invalidDate"),
  website: yup.string().url("validation.urlInvalid").optional().nullable(),
  contactPerson: yup.string().optional().nullable(),
  companyInfo: yup.string().optional().nullable(),
  vacancyName: yup.string().optional().nullable(),
  vacancyLink: yup.string().url("validation.urlInvalid").optional().nullable(),
  status: yup.number().required("validation.statusRequired").min(0).max(1),
});

export type CompanyFormValues = yup.InferType<typeof companySchema>;
