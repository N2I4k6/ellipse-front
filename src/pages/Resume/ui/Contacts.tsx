import { Col, Input, Row, Typography } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SectionCard } from './SectionCard';
import type { ResumeFormValues } from '../model/schema';
import styles from './Resume.module.scss';

const { Text } = Typography;

interface ContactsProps {
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  onSave: () => Promise<void>;
}

export const Contacts = ({ isEditing, onStartEdit, onCancel, onSave }: ContactsProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<ResumeFormValues>();

  const viewContent = (
    <div className={styles.infoText}>
      <Text strong>{t('resume.fields.phone')}: </Text>
      {watch('phone') || t('common.notSpecified')}
      <br />
      <Text strong>{t('resume.fields.email')}: </Text>
      {watch('email') || t('common.notSpecified')}
      <br />
      <Text strong>{t('resume.fields.telegram')}: </Text>
      {watch('telegram') || t('common.notSpecified')}
      <br />
      <Text strong>{t('resume.fields.whatsapp')}: </Text>
      {watch('whatsapp') || t('common.notSpecified')}
    </div>
  );

  return (
    <SectionCard
      title={t('resume.sections.contacts')}
      isEditing={isEditing}
      onStartEdit={onStartEdit}
      onCancel={onCancel}
      onSave={onSave}
      viewContent={viewContent}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <FormFieldWrapper label={t('resume.fields.phone')} error={errors.phone?.message}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormFieldWrapper>
        </Col>

        <Col xs={24} sm={12}>
          <FormFieldWrapper label={t('resume.fields.email')} error={errors.email?.message}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormFieldWrapper>
        </Col>

        <Col xs={24} sm={12}>
          <FormFieldWrapper label={t('resume.fields.telegram')} error={errors.telegram?.message}>
            <Controller
              name="telegram"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormFieldWrapper>
        </Col>

        <Col xs={24} sm={12}>
          <FormFieldWrapper label={t('resume.fields.whatsapp')} error={errors.whatsapp?.message}>
            <Controller
              name="whatsapp"
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

export default Contacts;