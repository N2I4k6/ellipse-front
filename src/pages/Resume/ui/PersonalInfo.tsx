import { Button, Col, DatePicker, Input, Row, Select, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/app/store/hooks';
import { selectResumeOptions } from '@/entities/Resume';
import { dayjs } from '@/shared/lib/date/dayjs';

import { SectionCard } from './SectionCard';
import { AvatarUpload } from './AvatarUpload';
import { exportResume } from '../model/exportResume';
import type { ResumeFormValues } from '../model/schema';
import styles from './Resume.module.scss';

const { Text } = Typography;

interface PersonalInfoProps {
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  onSave: () => Promise<void>;
}

export const PersonalInfo = ({
  isEditing,
  onStartEdit,
  onCancel,
  onSave,
}: PersonalInfoProps) => {
  const { t } = useTranslation();
  const options = useAppSelector(selectResumeOptions);
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<ResumeFormValues>();

  const workScheduleLabel = options?.workSchedules.find(
    (o) => o.value === watch('workSchedule'),
  )?.label;
  const employmentTypeLabel = options?.employmentTypes.find(
    (o) => o.value === watch('employmentType'),
  )?.label;
  const genderLabel = options?.genders.find((o) => o.value === watch('gender'))?.label;

  const displayName =
    [watch('firstName'), watch('lastName'), watch('middleName')]
      .filter(Boolean)
      .join(' ') || t('common.notSpecified');

  const viewContent = (
    <div className={styles.infoText}>
      <Text strong>{t('resume.fields.firstName')}: </Text>
      {displayName}
      <br />
      <Text strong>{t('resume.fields.position')}: </Text>
      {watch('position') || t('common.notSpecified')}
      <br />
      <Text strong>{t('resume.fields.workSchedule')}: </Text>
      {workScheduleLabel ? t(workScheduleLabel) : t('common.notSpecified')}
      <br />
      <Text strong>{t('resume.fields.employmentType')}: </Text>
      {employmentTypeLabel ? t(employmentTypeLabel) : t('common.notSpecified')}
      <br />
      <Text strong>{t('resume.fields.birthDate')}: </Text>
      {watch('birthDate')
        ? dayjs(watch('birthDate')).format('DD.MM.YYYY')
        : t('common.notSpecified')}
      <br />
      <Text strong>{t('resume.fields.gender')}: </Text>
      {genderLabel ? t(genderLabel) : t('common.notSpecified')}
      <br />
      <Text strong>{t('resume.fields.city')}: </Text>
      {watch('city') || t('common.notSpecified')}
    </div>
  );

  return (
    <SectionCard
      title={t('resume.sections.information')}
      isEditing={isEditing}
      onStartEdit={onStartEdit}
      onCancel={onCancel}
      onSave={onSave}
      viewContent={viewContent}
      extra={
        !isEditing ? (
          <Button
            icon={<DownloadOutlined />}
            onClick={() => void exportResume(watch(), options, t)}
          >
            {t('resume.export')}
          </Button>
        ) : null
      }
      headerSlot={<AvatarUpload />}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <FormFieldWrapper label={t('resume.fields.firstName')} error={errors.firstName?.message}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormFieldWrapper>
        </Col>

        <Col xs={24} sm={8}>
          <FormFieldWrapper label={t('resume.fields.lastName')} error={errors.lastName?.message}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormFieldWrapper>
        </Col>

        <Col xs={24} sm={8}>
          <FormFieldWrapper label={t('resume.fields.middleName')} error={errors.middleName?.message}>
            <Controller
              name="middleName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormFieldWrapper>
        </Col>

        <Col xs={24} sm={12}>
          <FormFieldWrapper label={t('resume.fields.position')} error={errors.position?.message}>
            <Controller
              name="position"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormFieldWrapper>
        </Col>

        <Col xs={24} sm={12}>
          <FormFieldWrapper label={t('resume.fields.workSchedule')} error={errors.workSchedule?.message}>
            <Controller
              name="workSchedule"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  options={options?.workSchedules.map((opt) => ({
                    value: opt.value,
                    label: t(opt.label),
                  }))}
                  className={styles.fullWidth}
                />
              )}
            />
          </FormFieldWrapper>
        </Col>

        <Col xs={24} sm={12}>
          <FormFieldWrapper
            label={t('resume.fields.employmentType')}
            error={errors.employmentType?.message}
          >
            <Controller
              name="employmentType"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  options={options?.employmentTypes.map((opt) => ({
                    value: opt.value,
                    label: t(opt.label),
                  }))}
                  className={styles.fullWidth}
                />
              )}
            />
          </FormFieldWrapper>
        </Col>

        <Col xs={24} sm={12}>
          <FormFieldWrapper label={t('resume.fields.birthDate')} error={errors.birthDate?.message}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : null)}
                  disabledDate={(current) => current && current > dayjs().endOf('day')}
                  format="YYYY-MM-DD"
                  className={styles.fullWidth}
                />
              )}
            />
          </FormFieldWrapper>
        </Col>

        <Col xs={24} sm={12}>
          <FormFieldWrapper label={t('resume.fields.gender')} error={errors.gender?.message}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  options={options?.genders.map((opt) => ({
                    value: opt.value,
                    label: t(opt.label),
                  }))}
                  className={styles.fullWidth}
                />
              )}
            />
          </FormFieldWrapper>
        </Col>

        <Col xs={24}>
          <FormFieldWrapper label={t('resume.fields.city')} error={errors.city?.message}>
            <Controller
              name="city"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormFieldWrapper>
        </Col>
      </Row>
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

export default PersonalInfo;