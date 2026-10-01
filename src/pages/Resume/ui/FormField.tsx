import { Form } from "antd";
import { Controller, type Control, type FieldError } from "react-hook-form";
import type { ReactNode } from "react";

interface FormFieldProps<T extends Record<string, unknown>> {
  name: keyof T;
  control: Control<T>;
  error?: FieldError;
  label: string;
  render: (field: {
    value: unknown;
    onChange: (v: unknown) => void;
    onBlur: () => void;
    name: string;
    ref: (el: unknown) => void;
  }) => ReactNode;
}

export const FormField = <T extends Record<string, unknown>>({
  name,
  control,
  error,
  label,
  render,
}: FormFieldProps<T>) => (
  <Form.Item
    label={label}
    validateStatus={error ? "error" : ""}
    help={error?.message}
  >
    <Controller
      name={name as never}
      control={control}
      render={({ field }) => render(field) as React.ReactElement}
    />
  </Form.Item>
);
