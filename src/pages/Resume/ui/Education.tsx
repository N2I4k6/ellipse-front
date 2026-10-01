import { Button, Col, Input, Row, Space, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SectionCard } from './SectionCard';
import type { ResumeFormValues } from '../model/schema';
import styles from './Resume.module.scss';

const { Text } = Typography;

interface EducationProps {
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  onSave: () => Promise<void>;
  onDelete: (index: number) => Promise<void>;
}

export const Education = ({
  isEditing,
  onStartEdit,
  onCancel,
  onSave,
  onDelete,
}: EducationProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<ResumeFormValues>();

  const { fields, append } = useFieldArray({
    control,
    name: 'education',
  });

  const educations = watch('education') ?? [];

  const viewContent = (
    <div>
      {educations.length === 0 && <Text>{t('common.notSpecified')}</Text>}

      {educations.map((edu, index) => (
        <div key={index} className={styles.experienceItem}>
          <Text strong>{edu.institution}</Text> — {edu.specialty} ({edu.startYear} — {edu.endYear}
          {edu.degree && `, ${edu.degree}`})
        </div>
      ))}
    </div>
  );

  return (
    <SectionCard
      title={t('resume.sections.education')}
      isEditing={isEditing}
      onStartEdit={onStartEdit}
      onCancel={onCancel}
      onSave={onSave}
      viewContent={viewContent}
    >
      <div>
        {fields.map((field, index) => (
          <Space key={field.id} direction="vertical" className={styles.repeatableItem}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <FormFieldWrapper
                  label={t('resume.fields.institution')}
                  error={errors.education?.[index]?.institution?.message}
                >
                  <Controller
                    name={`education.${index}.institution`}
                    control={control}
                    render={({ field: f }) => <Input {...f} />}
                  />
                </FormFieldWrapper>
              </Col>

              <Col xs={24} sm={8}>
                <FormFieldWrapper
                  label={t('resume.fields.specialty')}
                  error={errors.education?.[index]?.specialty?.message}
                >
                  <Controller
                    name={`education.${index}.specialty`}
                    control={control}
                    render={({ field: f }) => <Input {...f} />}
                  />
                </FormFieldWrapper>
              </Col>

              <Col xs={24} sm={4}>
                <FormFieldWrapper
                  label={t('resume.fields.startYear')}
                  error={errors.education?.[index]?.startYear?.message}
                >
                  <Controller
                    name={`education.${index}.startYear`}
                    control={control}
                    render={({ field: f }) => (
                      <Input
                        type="number"
                        value={f.value}
                        onChange={(e) => f.onChange(Number(e.target.value) || undefined)}
                      />
                    )}
                  />
                </FormFieldWrapper>
              </Col>

              <Col xs={24} sm={4}>
                <FormFieldWrapper
                  label={t('resume.fields.endYear')}
                  error={errors.education?.[index]?.endYear?.message}
                >
                  <Controller
                    name={`education.${index}.endYear`}
                    control={control}
                    render={({ field: f }) => (
                      <Input
                        type="number"
                        value={f.value}
                        onChange={(e) => f.onChange(Number(e.target.value) || undefined)}
                      />
                    )}
                  />
                </FormFieldWrapper>
              </Col>
            </Row>

            <FormFieldWrapper
              label={t('resume.fields.degree')}
              error={errors.education?.[index]?.degree?.message}
            >
              <Controller
                name={`education.${index}.degree`}
                control={control}
                render={({ field: f }) => <Input {...f} />}
              />
            </FormFieldWrapper>

            <Button
              type="dashed"
              danger
              icon={<DeleteOutlined />}
              onClick={() => void onDelete(index)}
            >
              {t('common.delete')}
            </Button>
          </Space>
        ))}

        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() =>
            append({
              institution: '',
              specialty: '',
              startYear: undefined as unknown as number,
              endYear: undefined as unknown as number,
              degree: '',
            })
          }
          className={styles.addButton}
        >
          {t('resume.addEducation')}
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

const FormFieldWrapper = ({ label, error, children }: FormFieldWrapperProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
      {error && <div className={styles.fieldError}>{t(error)}</div>}
    </div>
  );
};

export default Education;