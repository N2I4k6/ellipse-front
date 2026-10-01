import { Modal, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Paragraph } = Typography;

interface CompanyDeleteModalProps {
  open: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const CompanyDeleteModal = ({
  open,
  isLoading,
  onConfirm,
  onCancel,
}: CompanyDeleteModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("companies.confirmDelete.title")}
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={t("common.delete")}
      cancelText={t("common.cancel")}
      okButtonProps={{ danger: true, loading: isLoading }}
    >
      <Paragraph>{t("companies.confirmDelete.message")}</Paragraph>
    </Modal>
  );
};

export default CompanyDeleteModal;
