import { Modal, Typography, Button } from "antd";
import { useTranslation } from "react-i18next";
import type { CalendarEvent } from "@/entities/Company";
import { dayjs } from "@/shared/lib/date/dayjs";

const { Text } = Typography;

interface EventModalProps {
  event: CalendarEvent | null;
  onClose: () => void;
}

export const EventModal = ({ event, onClose }: EventModalProps) => {
  const { t, i18n } = useTranslation();

  const locale = i18n.language.startsWith("ru") ? "ru" : "en";

  return (
    <Modal
      title={t("calendar.eventDetails")}
      open={Boolean(event)}
      onCancel={onClose}
      footer={
        <Button type="primary" onClick={onClose}>
          {t("common.close")}
        </Button>
      }
    >
      {event && (
        <div>
          <Text strong>{t("calendar.fields.company")}:</Text>{" "}
          <Text>{event.companyName}</Text>
          <br />
          <Text strong>{t("companies.fields.stage")}:</Text>{" "}
          <Text>{event.stageTitle}</Text>
          <br />
          <Text strong>{t("calendar.fields.date")}:</Text>{" "}
          <Text>{dayjs(event.start).locale(locale).format("DD.MM.YYYY")}</Text>
        </div>
      )}
    </Modal>
  );
};
