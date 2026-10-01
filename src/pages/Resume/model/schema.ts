import * as yup from 'yup';

export const resumeSchema = yup.object({
  position: yup.string().optional(),
  workSchedule: yup.number().optional(),
  employmentType: yup.number().optional(),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  middleName: yup.string().optional(),
  birthDate: yup.string().nullable().optional(),
  gender: yup.number().optional(),
  city: yup.string().optional(),
  photo: yup.string().optional(),
  phone: yup.string().optional(),
  email: yup
    .string()
    .test(
      'email-or-empty',
      'validation.emailInvalid',
      (value) => !value || yup.string().email().isValidSync(value),
    ),
  telegram: yup.string().optional(),
  whatsapp: yup.string().optional(),
  about: yup.string().optional(),
  skills: yup.array().of(yup.string().required()).default([]),
  experience: yup
    .array()
    .of(
      yup.object({
        company: yup.string().required('validation.companyRequired'),
        position: yup.string().required('validation.positionRequired'),
        startDate: yup.string().required('validation.startDateRequired'),
        endDate: yup.string().optional(),
        description: yup.string().optional(),
      }),
    )
    .default([]),
  education: yup
    .array()
    .of(
      yup.object({
        institution: yup.string().required('validation.institutionRequired'),
        specialty: yup.string().required('validation.specialtyRequired'),
        startYear: yup
          .number()
          .typeError('validation.startYearRequired')
          .required('validation.startYearRequired'),
        endYear: yup
          .number()
          .typeError('validation.endYearRequired')
          .required('validation.endYearRequired'),
        degree: yup.string().optional(),
      }),
    )
    .default([]),
  linkedin: yup.string().optional(),
  businessTripReadiness: yup.boolean().optional(),
});

export type ResumeFormValues = yup.InferType<typeof resumeSchema>;