export interface HistoryEntry {
  stage: number;
  date: string;
}

export interface Company {
  id: string;
  userId: string;
  companyName: string;
  website: string | null;
  contactPerson: string | null;
  telegramNick: string | null;
  stage: number;
  companyInfo: string | null;
  stageDate: string | null;
  history: HistoryEntry[];
  vacancyName: string | null;
  vacancyLink: string | null;
  status: number;
  notificationStatus: "pending" | "sent";
}

export interface CompanyStage {
  type: number;
  title: string;
}

export interface CompanyStatus {
  type: number;
  title: string;
}

export interface CompanyState {
  companies: Company[];
  stages: CompanyStage[];
  statuses: CompanyStatus[];
  total: number;
  page: number;
  pages: number;
  currentCompany: Company | null;
  loading: boolean;
  formLoading: boolean;
  error: string | null;
}

export interface CompanyFilters {
  page?: number;
  limit?: number;
  companyName?: string;
  telegramNick?: string;
  stage?: number;
  vacancyName?: string;
  status?: number;
}

export interface CreateCompanyPayload {
  companyName: string;
  website?: string;
  contactPerson?: string;
  telegramNick?: string;
  stage?: number;
  companyInfo?: string;
  stageDate?: string;
  vacancyName?: string;
  vacancyLink?: string;
  status?: number;
}

export interface CalendarEvent {
  id: string;
  companyName: string;
  stageTitle: string;
  statusTitle: string;
  start: string;
  allDay: boolean;
  color: string;
  extendedProps: {
    companyId: string;
    stage: number;
    status: number;
    isPast: boolean;
  };
}
