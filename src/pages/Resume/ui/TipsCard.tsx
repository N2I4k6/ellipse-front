import { Card, Typography, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './Resume.module.scss';

const { Text } = Typography;

export const TipsCard = () => {
  const { t } = useTranslation();

  return (
    <Card title={t('resume.tips.title')} className={styles.tipsCard}>
      <Space direction="vertical">
        <Text>{t('coverLetter.aiAgentNotConnected')}</Text>
      </Space>
    </Card>
  );
};

export default TipsCard;