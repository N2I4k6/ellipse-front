import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AuthCard from "@/shared/ui/AuthCard";
import { ROUTES } from "@/shared/config/routes";
import { registerSchema, type RegisterFormData } from "../../model/schemas";
import { useRegister } from "../../model/useRegister";

export const RegisterForm = () => {
  const { t } = useTranslation();
  const { positions, loading, submit } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      positionType: undefined as unknown as number,
    },
  });

  return (
    <AuthCard title={t("auth.register.title")}>
      <Form onFinish={handleSubmit(submit)} layout="vertical">
        <Form.Item
          label={t("auth.email")}
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message ? t(errors.email.message) : undefined}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={t("auth.email.placeholder")} />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t("auth.username")}
          validateStatus={errors.username ? "error" : ""}
          help={
            errors.username?.message ? t(errors.username.message) : undefined
          }
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={t("auth.username.placeholder")} />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t("auth.password")}
          validateStatus={errors.password ? "error" : ""}
          help={
            errors.password?.message ? t(errors.password.message) : undefined
          }
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                placeholder={t("auth.password.placeholder")}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label={t("auth.position")}
          validateStatus={errors.positionType ? "error" : ""}
          help={
            errors.positionType?.message
              ? t(errors.positionType.message)
              : undefined
          }
        >
          <Controller
            name="positionType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={t("auth.position.placeholder")}
                options={positions.map((p) => ({
                  label: p.name,
                  value: p.type,
                }))}
                loading={loading}
                disabled={loading || positions.length === 0}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isSubmitting || loading}
          >
            {t("auth.register.submit")}
          </Button>
        </Form.Item>

        <Form.Item>
          <p>
            {t("auth.register.haveAccount")}{" "}
            <Link to={ROUTES.login}>{t("auth.login.submit")}</Link>
          </p>
        </Form.Item>
      </Form>
    </AuthCard>
  );
};

export default RegisterForm;
