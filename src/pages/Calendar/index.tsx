import { useMemo, useState, useCallback } from 'react';
import { Calendar, Spin, Typography } from 'antd';
import type { Dayjs } from 'dayjs';
import type { CalendarEvent } from '@/entities/Company';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  fetchCompanies,
  selectCalendarEvents,
  selectCompanyLoading,
  selectCompanyError,
} from '@/entities/Company';
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect';

import { CalendarCell } from './ui/CalendarCell';
import { CalendarHeader } from './ui/CalendarHeader';
import { EventModal } from './ui/EventModal';
import styles from './ui/Calendar.module.scss';

const { Text } = Typography;

const CalendarPage = () => {
  const dispatch = useAppDispatch();

  const events = useAppSelector(selectCalendarEvents);
  const loading = useAppSelector(selectCompanyLoading);
  const error = useAppSelector(selectCompanyError);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  useMountEffect(() => {
    dispatch(fetchCompanies({ page: 1, limit: 100 }));
  });

  const eventsByDate = useMemo(() => {
    return events.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
      acc[event.start] ??= [];
      acc[event.start].push(event);
      return acc;
    }, {});
  }, [events]);

  const handleDateSelect = useCallback(
    (date: Dayjs) => {
      const key = date.format('YYYY-MM-DD');
      const [first] = eventsByDate[key] ?? [];
      if (first) setSelectedEvent(first);
    },
    [eventsByDate],
  );

  const handleCloseModal = useCallback(() => setSelectedEvent(null), []);

  if (loading && events.length === 0) {
    return (
      <div className={styles.center}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.center}>
        <Text type="danger">{error}</Text>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Calendar
        fullscreen
        onSelect={handleDateSelect}
        cellRender={(current, info) => {
          if (info.type !== 'date') return info.originNode;
          const key = current.format('YYYY-MM-DD');
          return <CalendarCell events={eventsByDate[key] ?? []} />;
        }}
        headerRender={(props) => <CalendarHeader {...props} />}
        className={styles.calendar}
      />
      <EventModal event={selectedEvent} onClose={handleCloseModal} />
    </div>
  );
};

export default CalendarPage;