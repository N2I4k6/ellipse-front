import { Table, Button, Tag } from "antd";
import { EllipsisOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import type { Company, CompanyStage, CompanyStatus } from "@/entities/Company";
import { dayjs } from "@/shared/lib/date/dayjs";
import { stripAt } from "@/features/company";

interface CompaniesTableProps {
  companies: Company[];
  stages: CompanyStage[];
  statuses: CompanyStatus[];
  loading: boolean;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CompaniesTable = ({
  companies,
  stages,
  statuses,
  loading,
  page,
  pageSize,
  total,
  onPageChange,
  onEdit,
  onDelete,
}: CompaniesTableProps) => {
  const { t } = useTranslation();

  const columns: ColumnsType<Company> = [
    {
      title: t("companies.fields.name"),
      dataIndex: "companyName",
      key: "companyName",
      render: (text: string, record) =>
        record.website ? (
          <a href={record.website} target="_blank" rel="noopener noreferrer">
            {text || "—"}
          </a>
        ) : (
          text || "—"
        ),
    },
    {
      title: t("companies.fields.vacancyName"),
      dataIndex: "vacancyName",
      key: "vacancyName",
      render: (text: string, record) =>
        record.vacancyLink ? (
          <a
            href={record.vacancyLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text || "—"}
          </a>
        ) : (
          text || "—"
        ),
    },
    {
      title: t("companies.fields.contactPerson"),
      dataIndex: "contactPerson",
      key: "contactPerson",
      render: (text: string, record) =>
        record.telegramNick ? (
          <a
            href={`https://t.me/${stripAt(record.telegramNick)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text || record.telegramNick}
          </a>
        ) : (
          text || "—"
        ),
    },
    {
      title: t("companies.fields.stage"),
      dataIndex: "stage",
      key: "stage",
      render: (stage: number) =>
        stages.find((s) => s.type === stage)?.title ?? stage,
    },
    {
      title: t("companies.fields.status"),
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        const title = statuses.find((s) => s.type === status)?.title;
        const isActive = status === 1;
        return (
          <Tag color={isActive ? "success" : "error"}>
            {title ??
              (isActive
                ? t("companies.statuses.active")
                : t("companies.statuses.closed"))}
          </Tag>
        );
      },
    },
    {
      title: t("companies.fields.dateTime"),
      dataIndex: "stageDate",
      key: "stageDate",
      render: (date: string) =>
        date ? dayjs(date).format("HH:mm DD.MM.YYYY") : "—",
    },
    {
      title: t("companies.fields.moreDetailed"),
      key: "edit",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EllipsisOutlined />}
          onClick={() => onEdit(record.id)}
          aria-label={t("common.edit")}
        />
      ),
    },
    {
      title: t("common.delete"),
      key: "delete",
      render: (_, record) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(record.id)}
          aria-label={t("common.delete")}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={companies}
      rowKey="id"
      loading={loading}
      pagination={{
        current: page,
        pageSize,
        total,
        onChange: onPageChange,
        position: ["bottomRight"],
      }}
      scroll={{ x: 900 }}
    />
  );
};

export default CompaniesTable;
