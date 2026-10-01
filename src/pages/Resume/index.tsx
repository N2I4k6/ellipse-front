import { useEffect } from 'react';
import { Row, Col, Typography, Spin } from 'antd';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useResumeData } from './model/useResumeData';
import { useResumeForm } from './model/useResumeForm';
import { useResumeSections } from './model/useResumeSections';
import { PersonalInfo } from './ui/PersonalInfo';
import { Contacts } from './ui/Contacts';
import { Experience } from './ui/Experience';
import { Skills } from './ui/Skills';
import { Education } from './ui/Education';
import { About } from './ui/About';
import { TipsCard } from './ui/TipsCard';
import styles from './ui/Resume.module.scss';

const { Title, Text } = Typography;

const ResumePage = () => {
  const { t } = useTranslation();
  const { resume, formValues, loading, error } = useResumeData();
  const {
    form,
    saveMainInfo,
    saveLastExperience,
    removeExperience,
    saveLastEducation,
    removeEducation,
    resetFromResume,
  } = useResumeForm();
  const sections = useResumeSections();
  const { startEditing } = sections;

  useEffect(() => {
    if (!resume) return;

    resetFromResume(formValues);
    if (!formValues.firstName && !formValues.lastName) {
      startEditing('personalInfo');
    }
  }, [resume]);

  if (loading && !formValues.firstName) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Text type="danger">{error}</Text>
      </div>
    );
  }

  const wrapSave =
    (sectionKey: keyof typeof sections.editing, handler: () => Promise<void>) =>
    async () => {
      await handler();
      sections.stopEditing(sectionKey);
    };

  return (
    <FormProvider {...form}>
      <div className={styles.container}>
        <Title level={4}>{t('resume.title')}</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={18}>
            <PersonalInfo
              isEditing={sections.editing.personalInfo}
              onStartEdit={() => sections.startEditing('personalInfo')}
              onCancel={() => sections.stopEditing('personalInfo')}
              onSave={wrapSave('personalInfo', saveMainInfo)}
            />
            <Contacts
              isEditing={sections.editing.contacts}
              onStartEdit={() => sections.startEditing('contacts')}
              onCancel={() => sections.stopEditing('contacts')}
              onSave={wrapSave('contacts', saveMainInfo)}
            />
            <Experience
              isEditing={sections.editing.experience}
              onStartEdit={() => sections.startEditing('experience')}
              onCancel={() => sections.stopEditing('experience')}
              onSave={wrapSave('experience', saveLastExperience)}
              onDelete={removeExperience}
            />
            <Skills
              isEditing={sections.editing.skills}
              onStartEdit={() => sections.startEditing('skills')}
              onCancel={() => sections.stopEditing('skills')}
              onSave={wrapSave('skills', saveMainInfo)}
            />
            <Education
              isEditing={sections.editing.education}
              onStartEdit={() => sections.startEditing('education')}
              onCancel={() => sections.stopEditing('education')}
              onSave={wrapSave('education', saveLastEducation)}
              onDelete={removeEducation}
            />
            <About
              isEditing={sections.editing.about}
              onStartEdit={() => sections.startEditing('about')}
              onCancel={() => sections.stopEditing('about')}
              onSave={wrapSave('about', saveMainInfo)}
            />
          </Col>
          <Col xs={24} md={6}>
            <TipsCard />
          </Col>
        </Row>
      </div>
    </FormProvider>
  );
};

export default ResumePage;