import { Badge } from "antd";
import type { CalendarEvent } from "@/entities/Company";
import styles from "./Calendar.module.scss";

interface CalendarCellProps {
  events: CalendarEvent[];
}

export const CalendarCell = ({ events }: CalendarCellProps) => {
  if (events.length === 0) return null;

  return (
    <ul className={styles.events}>
      {events.map((event) => (
        <li key={event.id}>
          <Badge
            status={event.extendedProps.isPast ? "default" : "processing"}
            text={`${event.companyName} - ${event.stageTitle}`}
          />
        </li>
      ))}
    </ul>
  );
};
