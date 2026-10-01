import { Button, Col, DatePicker, Input, Row, Space, Typography } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { dayjs } from "@/shared/lib/date/dayjs";

import { SectionCard } from "./SectionCard";
import type { ResumeFormValues } from "../model/schema";
import styles from "./Resume.module.scss";

const { Text } = Typography;

interface ExperienceProps {
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  onSave: () => Promise<void>;
  onDelete: (index: number) => Promise<void>;
}

export const Experience = ({
  isEditing,
  onStartEdit,
  onCancel,
  onSave,
  onDelete,
}: ExperienceProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<ResumeFormValues>();

  const { fields, append } = useFieldArray({
    control,
    name: "experience",
  });

  const experiences = watch("experience") ?? [];

  const viewContent = (
    <div>
      {experiences.length === 0 && <Text>{t("common.notSpecified")}</Text>}

      {experiences.map((exp, index) => (
        <div key={index} className={styles.experienceItem}>
          <Text strong>{exp.company}</Text> — {exp.position} (
          {exp.startDate
            ? dayjs(exp.startDate).format("MM.YYYY")
            : t("common.notSpecified")}{" "}
          —{" "}
          {exp.endDate
            ? dayjs(exp.endDate).format("MM.YYYY")
            : t("common.present")}
          )
          {exp.description && (
            <>
              <br />
              <Text>{exp.description}</Text>
            </>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <SectionCard
      title={t("resume.sections.experience")}
      isEditing={isEditing}
      onStartEdit={onStartEdit}
      onCancel={onCancel}
      onSave={onSave}
      viewContent={viewContent}
    >
      <div>
        {fields.map((field, index) => (
          <Space
            key={field.id}
            direction="vertical"
            className={styles.repeatableItem}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={6}>
                <FormFieldWrapper
                  label={t("resume.fields.company")}
                  error={errors.experience?.[index]?.company?.message}
                >
                  <Controller
                    name={`experience.${index}.company`}
                    control={control}
                    render={({ field: f }) => <Input {...f} />}
                  />
                </FormFieldWrapper>
              </Col>

              <Col xs={24} sm={6}>
                <FormFieldWrapper
                  label={t("resume.fields.position")}
                  error={errors.experience?.[index]?.position?.message}
                >
                  <Controller
                    name={`experience.${index}.position`}
                    control={control}
                    render={({ field: f }) => <Input {...f} />}
                  />
                </FormFieldWrapper>
              </Col>

              <Col xs={24} sm={6}>
                <FormFieldWrapper
                  label={t("resume.fields.startDate")}
                  error={errors.experience?.[index]?.startDate?.message}
                >
                  <Controller
                    name={`experience.${index}.startDate`}
                    control={control}
                    render={({ field: f }) => (
                      <DatePicker
                        value={f.value ? dayjs(f.value) : null}
                        onChange={(date) =>
                          f.onChange(date ? date.toISOString() : null)
                        }
                        format="YYYY-MM-DD"
                        className={styles.fullWidth}
                      />
                    )}
                  />
                </FormFieldWrapper>
              </Col>

              <Col xs={24} sm={6}>
                <FormFieldWrapper
                  label={t("resume.fields.endDate")}
                  error={errors.experience?.[index]?.endDate?.message}
                >
                  <Controller
                    name={`experience.${index}.endDate`}
                    control={control}
                    render={({ field: f }) => (
                      <DatePicker
                        value={f.value ? dayjs(f.value) : null}
                        onChange={(date) =>
                          f.onChange(date ? date.toISOString() : null)
                        }
                        format="YYYY-MM-DD"
                        className={styles.fullWidth}
                      />
                    )}
                  />
                </FormFieldWrapper>
              </Col>
            </Row>

            <FormFieldWrapper
              label={t("resume.fields.description")}
              error={errors.experience?.[index]?.description?.message}
            >
              <Controller
                name={`experience.${index}.description`}
                control={control}
                render={({ field: f }) => <Input.TextArea {...f} rows={3} />}
              />
            </FormFieldWrapper>

            <Button
              type="dashed"
              danger
              icon={<DeleteOutlined />}
              onClick={() => void onDelete(index)}
            >
              {t("common.delete")}
            </Button>
          </Space>
        ))}

        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() =>
            append({
              company: "",
              position: "",
              startDate: "",
              endDate: undefined,
              description: "",
            })
          }
          className={styles.addButton}
        >
          {t("resume.addExperience")}
        </Button>
      </div>
    </SectionCard>
  );
};

interface FormFieldWrapperProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const FormFieldWrapper = ({
  label,
  error,
  children,
}: FormFieldWrapperProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
      {error && <div className={styles.fieldError}>{t(error)}</div>}
    </div>
  );
};

export default Experience;
