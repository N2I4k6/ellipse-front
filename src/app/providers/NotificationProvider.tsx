import { useEffect, type FC, type ReactNode } from 'react';
import { notification } from 'antd';

import { setNotificationApi } from '@/shared/lib/notification';

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: FC<NotificationProviderProps> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    setNotificationApi(api);
  }, [api]);

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};