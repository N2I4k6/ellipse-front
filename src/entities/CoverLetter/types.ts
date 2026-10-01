export interface CoverLetter {
    id: string;
    vacancyUrl: string;
    generatedLetter: string;
    resumeText?: string;
    createdAt?: string;
  }
  
  export interface CoverLetterState {
    letters: CoverLetter[];
    currentLetter: CoverLetter | null;
    total: number;
    page: number;
    pages: number;
    loading: boolean;
    error: string | null;
  }
  
  export interface GetCoverLettersParams {
    page?: number;
    limit?: number;
  }
  
  export interface GenerateCoverLetterPayload {
    vacancyUrl: string;
    resume: File;
  }