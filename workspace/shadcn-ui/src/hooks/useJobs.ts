import { useState, useEffect } from 'react';
import { Job, JobFormData } from '@/types/Job';

const STORAGE_KEY = 'myjob-jobs';

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load jobs from localStorage on mount
  useEffect(() => {
    const savedJobs = localStorage.getItem(STORAGE_KEY);
    if (savedJobs) {
      try {
        setJobs(JSON.parse(savedJobs));
      } catch (error) {
        console.error('Error loading jobs from localStorage:', error);
      }
    }
  }, []);

  // Save jobs to localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (jobData: JobFormData) => {
    const newJob: Job = {
      id: crypto.randomUUID(),
      ...jobData,
      createdAt: new Date().toISOString(),
    };
    setJobs(prev => [newJob, ...prev]);
    return newJob;
  };

  const updateJob = (id: string, jobData: JobFormData) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, ...jobData } : job
    ));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const getJob = (id: string) => {
    return jobs.find(job => job.id === id);
  };

  return {
    jobs,
    addJob,
    updateJob,
    deleteJob,
    getJob,
  };
};