export interface ResponsePoint {
    date: string;
    count: number;
  }
  
  export interface StatisticsStages {
    offers: number | null;
    technical_interviews: number | null;
    interviews: number | null;
    test_assignments: number | null;
  }
  
  export interface Statistics {
    id: string;
    id_user: string;
    tests: {
      total: number | null;
      completed: number | null;
    };
    responses: ResponsePoint[];
    stages: StatisticsStages;
  }
  
  export interface StatisticsState {
    statistics: Statistics | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface AddResponsePayload {
    date: string;
    count: number;
  }