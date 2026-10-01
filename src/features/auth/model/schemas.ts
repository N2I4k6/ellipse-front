import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("validation.email.invalid")
    .required("validation.email.required"),
  password: yup.string().required("validation.password.required"),
});

export const registerSchema = yup.object({
  email: yup
    .string()
    .email("validation.email.invalid")
    .required("validation.email.required"),
  password: yup
    .string()
    .min(6, "validation.password.min")
    .required("validation.password.required"),
  username: yup
    .string()
    .min(3, "validation.username.min")
    .required("validation.username.required"),
  positionType: yup
    .number()
    .required("validation.position.required")
    .typeError("validation.position.required"),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
