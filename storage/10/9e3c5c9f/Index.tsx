import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Briefcase } from 'lucide-react';
import { JobCard } from '@/components/JobCard';
import { JobForm } from '@/components/JobForm';
import { useJobs } from '@/hooks/useJobs';
import { Job } from '@/types/Job';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Index() {
  const { jobs, addJob, updateJob, deleteJob } = useJobs();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddJob = () => {
    setEditingJob(null);
    setIsFormOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData: any) => {
    if (editingJob) {
      updateJob(editingJob.id, formData);
    } else {
      addJob(formData);
    }
  };

  const handleDeleteClick = (jobId: string) => {
    setDeleteJobId(jobId);
  };

  const handleDeleteConfirm = () => {
    if (deleteJobId) {
      deleteJob(deleteJobId);
      setDeleteJobId(null);
    }
  };

  const activeJobs = filteredJobs.filter(job => new Date(job.deadline) >= new Date());
  const expiredJobs = filteredJobs.filter(job => new Date(job.deadline) < new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MyJob</h1>
                <p className="text-sm text-gray-600">Local Job Circular Manager</p>
              </div>
            </div>
            <Button onClick={handleAddJob} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Job</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search jobs or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Total Jobs</h3>
            <p className="text-3xl font-bold text-blue-600">{jobs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Active Jobs</h3>
            <p className="text-3xl font-bold text-green-600">{activeJobs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Expired Jobs</h3>
            <p className="text-3xl font-bold text-red-600">{expiredJobs.length}</p>
          </div>
        </div>

        {/* Job Listings */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {jobs.length === 0 ? 'No jobs yet' : 'No jobs found'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {jobs.length === 0 
                ? 'Get started by adding your first job circular.' 
                : 'Try adjusting your search terms.'}
            </p>
            {jobs.length === 0 && (
              <div className="mt-6">
                <Button onClick={handleAddJob}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Job
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Active Jobs */}
            {activeJobs.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Active Jobs ({activeJobs.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onEdit={handleEditJob}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Expired Jobs */}
            {expiredJobs.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Expired Jobs ({expiredJobs.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {expiredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onEdit={handleEditJob}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            © 2025 MyJob - Local Job Circular Manager. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Job Form Modal */}
      <JobForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editJob={editingJob}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteJobId} onOpenChange={() => setDeleteJobId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this job? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}