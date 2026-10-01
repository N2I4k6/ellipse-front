import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AuthCard from "@/shared/ui/AuthCard";
import { ROUTES } from "@/shared/config/routes";
import { loginSchema, type LoginFormData } from "../../model/schemas";
import { useLogin } from "../../model/useLogin";

export const LoginForm = () => {
  const { t } = useTranslation();
  const onSubmit = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <AuthCard title={t("auth.login.title")}>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
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

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isSubmitting}>
            {t("auth.login.submit")}
          </Button>
        </Form.Item>

        <Form.Item>
          <p>
            {t("auth.login.noAccount")}{" "}
            <Link to={ROUTES.register}>
              {t("auth.login.linkToRegister")}
            </Link>
          </p>
        </Form.Item>
      </Form>
    </AuthCard>
  );
};

export default LoginForm;
