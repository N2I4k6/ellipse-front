export interface Experience {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }
  
  export interface Education {
    institution: string;
    specialty: string;
    startYear: number;
    endYear: number;
    degree?: string;
  }
  
  export interface Resume {
    userId: string;
    position: string;
    workSchedule: number;
    employmentType: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    birthDate: string | null;
    gender: number;
    city: string;
    phone: string;
    email: string;
    telegram?: string;
    whatsapp?: string;
    linkedin?: string;
    photo?: string;
    about?: string;
    skills: string[];
    experience: Experience[];
    education: Education[];
    businessTripReadiness: boolean;
    updatedAt: string;
  }
  
  export interface SelectOption {
    label: string;
    value: number;
  }
  
  export interface ResumeOptions {
    workSchedules: SelectOption[];
    employmentTypes: SelectOption[];
    genders: SelectOption[];
  }
  
  export interface ResumeState {
    resume: Resume | null;
    options: ResumeOptions | null;
    loading: boolean;
    error: string | null;
  }