import { Typography, Button, Divider } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '@/app/store/hooks';
import { openOnboarding } from '@/entities/User';

import LogoutButton from './ui/LogoutButton';
import ThemeSwitcher from './ui/ThemeSwitcher';
import LanguageSwitcher from './ui/LanguageSwitcher';
import UserNameForm from './ui/UserNameForm';
import UserAvatar from './ui/UserAvatar';
import styles from './ui/Settings.module.scss';

const { Title } = Typography;

const SettingsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleRepeatOnboarding = useCallback(() => {
    dispatch(openOnboarding());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Title level={4}>{t('settings.title')}</Title>

      <div className={styles.settingsContainer}>
        <div className={styles.userSection}>
          <UserAvatar />
          <UserNameForm />
        </div>

        <Divider />

        <ThemeSwitcher />
        <LanguageSwitcher />

        <Divider />

        <Button
          className={styles.styledButton}
          onClick={handleRepeatOnboarding}
          block
        >
          {t('settings.repeatOnboarding')}
        </Button>

        <LogoutButton />
      </div>
    </div>
  );
};

export default SettingsPage;