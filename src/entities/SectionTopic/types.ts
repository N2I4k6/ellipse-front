export interface Section {
    id: string;
    userId: string;
    title: string;
    name: string;
    color: string;
    type: string;
    items: string[];
    completed: boolean;
  }
  
  export interface Topic {
    id: string;
    userId: string;
    title: string;
    name: string;
    text: string;
    completed: boolean;
    sections: string[];
  }
  
  export interface SectionTopicState {
    sections: Section[];
    topics: Topic[];
    totalSections: number;
    pageSections: number;
    pagesSections: number;
    currentSection: Section | null;
    currentTopic: Topic | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface CreateSectionPayload {
    title: string;
    name: string;
    color: string;
    type: string;
  }
  
  export interface CreateTopicPayload {
    title: string;
    name: string;
    text?: string;
    completed?: boolean;
    sections?: string[];
  }
  
  export interface GetSectionsParams {
    type: string;
    page?: number;
    limit?: number;
  }