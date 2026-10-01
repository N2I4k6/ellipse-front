import { Input, Typography } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SectionCard } from './SectionCard';
import type { ResumeFormValues } from '../model/schema';
import styles from './Resume.module.scss';

const { Text } = Typography;

interface AboutProps {
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  onSave: () => Promise<void>;
}

export const About = ({ isEditing, onStartEdit, onCancel, onSave }: AboutProps) => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<ResumeFormValues>();

  const viewContent = (
    <Text>{watch('about') || t('common.notSpecified')}</Text>
  );

  return (
    <SectionCard
      title={t('resume.sections.about')}
      isEditing={isEditing}
      onStartEdit={onStartEdit}
      onCancel={onCancel}
      onSave={onSave}
      viewContent={viewContent}
    >
      <Controller
        name="about"
        control={control}
        render={({ field }) => (
          <Input.TextArea
            {...field}
            rows={4}
            status={errors.about ? 'error' : undefined}
          />
        )}
      />
      {errors.about?.message && (
        <div className={styles.fieldError}>{t(errors.about.message)}</div>
      )}
    </SectionCard>
  );
};

export default About;