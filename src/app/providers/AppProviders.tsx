import { useMemo, type FC, type ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import ruRU from 'antd/locale/ru_RU';
import enUS from 'antd/locale/en_US';

import { useTheme } from '@/app/providers/ThemeContext';
import { NotificationProvider } from '@/app/providers/NotificationProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  const antdLocale = useMemo(
    () => (i18n.language.startsWith('ru') ? ruRU : enUS),
    [i18n.language],
  );

  return (
    <ConfigProvider locale={antdLocale} theme={theme}>
      <NotificationProvider>{children}</NotificationProvider>
    </ConfigProvider>
  );
};