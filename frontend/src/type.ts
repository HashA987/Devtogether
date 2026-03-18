import { ReactNode } from "react";

export interface JobOption {
  title: string;
  responsiblities: string;
  why: string;
}

export interface User {
  user_id: number;
  name: string;
  email: string;
  phone_number: string;
  role: "jobseeker" | "recruiter";
  resume: string | null;
  resume_public_id: string | null;
  profile_pic: string | null;
  profile_pic_public_id: string | null;
  skills: string[];
}

export interface AppContextType {
  user: User | null;
  loading: boolean;
  btnLoading: boolean;
  isAuth: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  logoutUser: () => Promise<void>;
  updateProfilePic: (formData: any) => Promise<void>;
  updateResume: (formData: any) => Promise<void>;
  updateUser: (name: string, phoneNumber: string) => Promise<void>;
  addSkill: (
    skill: string,
    setSkill: React.Dispatch<React.SetStateAction<string>>,
  ) => Promise<void>;
  removeSkill: (skill: string) => Promise<void>;
  applyJob: (job_id: number) => Promise<void>;
  applications: Application[];
  fetchApplications: () => Promise<void>;
}

export interface AppProviderProps {
  children: ReactNode;
}

export interface AccountProps {
  user: User;
  isYourAccount: boolean;
}

export interface Job {
  job_id: number;
  title: string;
  description: string;
  salary: number | null;
  location: string | null;
  job_type: "Full-time" | "Part-time" | "Contract" | "Internship";
  openings: number;
  role: string;
  work_location: "On-site" | "Remote" | "Hybrid";
  company_id: number;
  company_name: string;
  company_logo: string;
  posted_by_recruiter_id: number;
  created_at: string;
  is_active: boolean;
}

export interface Company {
  company_id: string;
  name: string;
  description: string;
  website: string;
  logo: string;
  logo_public_id: string;
  recruiter_id: number;
  created_id: string;
  jobs?: Job[];
}

type ApplicationStatus = "submitted" | "Rejected" | "Hired";

export interface Application {
  application_id: number;
  job_id: number;
  applicant_id: number;
  applicant_email: string;
  status: ApplicationStatus;
  resume: string;
  applied_at: string;
  job_title: string;
  job_salary: number | null;
  job_location: string;
}
