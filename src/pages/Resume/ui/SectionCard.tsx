import { Card, Typography, Button, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Resume.module.scss';

const { Title } = Typography;

interface SectionCardProps {
  title: string;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  onSave: () => void | Promise<void>;
  children: ReactNode;
  viewContent: ReactNode;
  extra?: ReactNode;
  headerSlot?: ReactNode;
}

export const SectionCard = ({
  title,
  isEditing,
  onStartEdit,
  onCancel,
  onSave,
  children,
  viewContent,
  extra,
  headerSlot,
}: SectionCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.resumeCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardHeaderLeft}>
          {headerSlot}
          <Title level={5} className={styles.cardTitle}>
            {title}
          </Title>
        </div>
        {extra}
      </div>

      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void onSave();
          }}
        >
          {children}
          <Space className={styles.editActions}>
            <Button type="primary" htmlType="submit">
              {t('common.save')}
            </Button>
            <Button onClick={onCancel}>{t('common.cancel')}</Button>
          </Space>
        </form>
      ) : (
        <div>
          {viewContent}
          <Space className={styles.editActions}>
            <Button icon={<EditOutlined />} onClick={onStartEdit}>
              {t('common.edit')}
            </Button>
          </Space>
        </div>
      )}
    </Card>
  );
};

export default SectionCard;