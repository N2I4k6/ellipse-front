import * as yup from "yup";

export const coverLetterSchema = yup.object({
  vacancyUrl: yup
    .string()
    .url("validation.urlInvalid")
    .required("validation.urlRequired"),
  resume: yup.mixed<File>().required("validation.resumeRequired").nullable(),
});

export type CoverLetterFormData = yup.InferType<typeof coverLetterSchema>;
