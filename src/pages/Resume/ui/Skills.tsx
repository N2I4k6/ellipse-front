import { Select, Space, Tag, Typography } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { SectionCard } from './SectionCard';
import type { ResumeFormValues } from '../model/schema';
import styles from './Resume.module.scss';

interface SkillsProps {
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  onSave: () => Promise<void>;
}

export const Skills = ({ isEditing, onStartEdit, onCancel, onSave }: SkillsProps) => {
  const { t } = useTranslation();
  const { control, watch } = useFormContext<ResumeFormValues>();

  const skills = watch('skills') ?? [];

  const viewContent =
    skills.length > 0 ? (
      <Space wrap>
        {skills.map((skill, index) => (
          <Tag key={`${skill}-${index}`} color="purple">
            {skill}
          </Tag>
        ))}
      </Space>
    ) : (
      <Typography.Text>{t('common.notSpecified')}</Typography.Text>
    );

  return (
    <SectionCard
      title={t('resume.sections.skills')}
      isEditing={isEditing}
      onStartEdit={onStartEdit}
      onCancel={onCancel}
      onSave={onSave}
      viewContent={viewContent}
    >
      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <Select
            mode="tags"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            className={styles.fullWidth}
          />
        )}
      />
    </SectionCard>
  );
};

export default Skills;