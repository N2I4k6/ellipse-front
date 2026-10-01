import { Button, Drawer, Input, Select, DatePicker } from "antd";
import { Controller, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { dayjs } from "@/shared/lib/date/dayjs";
import type { Company, CompanyStage, CompanyStatus } from "@/entities/Company";
import type { CompanyFormValues } from "../model/schema";
import styles from "./CompanyFormDrawer.module.scss";

interface CompanyFormDrawerProps {
  open: boolean;
  editing: boolean;
  isSubmitting: boolean;
  form: UseFormReturn<CompanyFormValues>;
  stages: CompanyStage[];
  statuses: CompanyStatus[];
  currentCompany: Company | null;
  placement?: "bottom" | "right";
  height?: string;
  onClose: () => void;
  onSubmit: (values: CompanyFormValues) => void | Promise<void>;
}

export const CompanyFormDrawer = ({
  open,
  editing,
  isSubmitting,
  form,
  stages,
  statuses,
  currentCompany,
  placement = "right",
  height,
  onClose,
  onSubmit,
}: CompanyFormDrawerProps) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <Drawer
      title={editing ? t("companies.edit") : t("companies.add")}
      placement={placement}
      height={height}
      onClose={onClose}
      open={open}
      className={styles.drawer}
    >
      <form onSubmit={handleSubmit((values) => void onSubmit(values))}>
        <FormField
          label={t("companies.fields.name")}
          error={errors.companyName?.message}
        >
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <Input {...field} value={field.value ?? ""} />
            )}
          />
        </FormField>

        <FormField
          label={t("companies.fields.website")}
          error={errors.website?.message}
        >
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <Input {...field} value={field.value ?? ""} />
            )}
          />
        </FormField>

        <FormField
          label={t("companies.fields.vacancyName")}
          error={errors.vacancyName?.message}
        >
          <Controller
            name="vacancyName"
            control={control}
            render={({ field }) => (
              <Input {...field} value={field.value ?? ""} />
            )}
          />
        </FormField>

        <FormField
          label={t("companies.fields.vacancyLink")}
          error={errors.vacancyLink?.message}
        >
          <Controller
            name="vacancyLink"
            control={control}
            render={({ field }) => (
              <Input {...field} value={field.value ?? ""} />
            )}
          />
        </FormField>

        <FormField
          label={t("companies.fields.contactPerson")}
          error={errors.contactPerson?.message}
        >
          <Controller
            name="contactPerson"
            control={control}
            render={({ field }) => (
              <Input {...field} value={field.value ?? ""} />
            )}
          />
        </FormField>

        <FormField
          label={t("companies.fields.contactPersonTg")}
          error={errors.telegramNick?.message}
        >
          <Controller
            name="telegramNick"
            control={control}
            render={({ field }) => (
              <Input {...field} value={field.value ?? ""} />
            )}
          />
        </FormField>

        <FormField
          label={t("companies.fields.stage")}
          error={errors.stage?.message}
        >
          <Controller
            name="stage"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={(v) => field.onChange(Number(v))}
                options={stages.map((s) => ({ value: s.type, label: s.title }))}
                className={styles.fullWidth}
              />
            )}
          />
        </FormField>

        <FormField
          label={t("companies.fields.status")}
          error={errors.status?.message}
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={(v) => field.onChange(Number(v))}
                options={statuses.map((s) => ({
                  value: s.type,
                  label: s.title,
                }))}
                className={styles.fullWidth}
              />
            )}
          />
        </FormField>

        <FormField
          label={t("companies.fields.dateTime")}
          error={errors.stageDate?.message}
        >
          <Controller
            name="stageDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) =>
                  field.onChange(date ? date.format("YYYY-MM-DD HH:mm:ss") : "")
                }
                className={styles.fullWidth}
                status={errors.stageDate ? "error" : undefined}
              />
            )}
          />
        </FormField>

        <FormField
          label={t("companies.fields.info")}
          error={errors.companyInfo?.message}
        >
          <Controller
            name="companyInfo"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} value={field.value ?? ""} rows={3} />
            )}
          />
        </FormField>

        {currentCompany?.history && currentCompany.history.length > 0 && (
          <div className={styles.historyBlock}>
            <label className={styles.fieldLabel}>
              {t("companies.fields.history")}
            </label>
            <ul className={styles.historyList}>
              {currentCompany.history.map((entry, index) => (
                <li key={`${entry.stage}-${index}`}>
                  {stages.find((s) => s.type === entry.stage)?.title ??
                    entry.stage}
                  : {dayjs(entry.date).format("HH:mm DD.MM.YYYY")}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button type="primary" htmlType="submit" loading={isSubmitting} block>
          {t("common.save")}
        </Button>
      </form>
    </Drawer>
  );
};

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

const FormField = ({ label, error, children }: FormFieldProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
      {error && <div className={styles.fieldError}>{t(error)}</div>}
    </div>
  );
};

export default CompanyFormDrawer;
