export interface Job {
  id: string;
  title: string;
  company: string;
  deadline: string;
  contact: string;
  createdAt: string;
}

export interface JobFormData {
  title: string;
  company: string;
  deadline: string;
  contact: string;
}