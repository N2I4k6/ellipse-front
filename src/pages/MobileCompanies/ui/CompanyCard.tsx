import { Card, Typography, Tag } from 'antd';
import { EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { Company, CompanyStage, CompanyStatus } from '@/entities/Company';
import { dayjs } from '@/shared/lib/date/dayjs';
import { stripAt } from '@/features/company';
import styles from './MobileCompanies.module.scss';

const { Text } = Typography;

interface CompanyCardProps {
  company: Company;
  stages: CompanyStage[];
  statuses: CompanyStatus[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CompanyCard = ({
  company,
  stages,
  statuses,
  onEdit,
  onDelete,
}: CompanyCardProps) => {
  const { t } = useTranslation();

  const stageTitle = stages.find((s) => s.type === company.stage)?.title ?? company.stage;
  const statusTitle =
    statuses.find((s) => s.type === company.status)?.title ??
    (company.status === 1 ? t('companies.statuses.active') : t('companies.statuses.closed'));
  const isActive = company.status === 1;

  return (
    <Card
      className={styles.card}
      actions={[
        <EllipsisOutlined key="edit" onClick={() => onEdit(company.id)} />,
        <DeleteOutlined key="delete" onClick={() => onDelete(company.id)} />,
      ]}
    >
      <div className={styles.cardContent}>
        <Text strong>
          {company.website ? (
            <a href={company.website} target="_blank" rel="noopener noreferrer">
              {company.companyName || '—'}
            </a>
          ) : (
            company.companyName || '—'
          )}
        </Text>

        <Text>
          {t('companies.fields.vacancyName')}:{' '}
          {company.vacancyLink ? (
            <a href={company.vacancyLink} target="_blank" rel="noopener noreferrer">
              {company.vacancyName || '—'}
            </a>
          ) : (
            company.vacancyName || '—'
          )}
        </Text>

        <Text>
          {t('companies.fields.contactPerson')}:{' '}
          {company.telegramNick ? (
            <a
              href={`https://t.me/${stripAt(company.telegramNick)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {company.contactPerson || company.telegramNick}
            </a>
          ) : (
            company.contactPerson || '—'
          )}
        </Text>

        <Text>
          {t('companies.fields.stage')}: {stageTitle}
        </Text>

        <Text className={styles.status}>
          {t('companies.fields.status')}:{' '}
          <Tag color={isActive ? 'success' : 'error'}>{statusTitle}</Tag>
        </Text>

        <Text>
          {t('companies.fields.dateTime')}:{' '}
          {company.stageDate ? dayjs(company.stageDate).format('DD.MM.YYYY HH:mm') : '—'}
        </Text>
      </div>
    </Card>
  );
};

export default CompanyCard;