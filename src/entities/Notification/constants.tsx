import {
    CloseCircleOutlined,
    CheckCircleOutlined,
    WarningOutlined,
    InfoCircleOutlined,
  } from '@ant-design/icons';
  import type { ReactNode } from 'react';
  import { NotificationType } from '@/shared/lib/notification';
  
  interface NotificationTypeMeta {
    icon: ReactNode;
    color: string;
    labelKey: string;
  }
  
  export const NOTIFICATION_TYPE_META: Record<NotificationType, NotificationTypeMeta> = {
    [NotificationType.Error]: {
      icon: <CloseCircleOutlined />,
      color: 'red',
      labelKey: 'notifications.types.error',
    },
    [NotificationType.Success]: {
      icon: <CheckCircleOutlined />,
      color: 'green',
      labelKey: 'notifications.types.success',
    },
    [NotificationType.Warning]: {
      icon: <WarningOutlined />,
      color: 'gold',
      labelKey: 'notifications.types.warning',
    },
    [NotificationType.Info]: {
      icon: <InfoCircleOutlined />,
      color: 'blue',
      labelKey: 'notifications.types.info',
    },
  };