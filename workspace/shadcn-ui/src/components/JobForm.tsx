import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { JobFormData, Job } from '@/types/Job';

interface JobFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: JobFormData) => void;
  editJob?: Job | null;
}

export const JobForm = ({ isOpen, onClose, onSubmit, editJob }: JobFormProps) => {
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    deadline: '',
    contact: '',
  });

  const [errors, setErrors] = useState<Partial<JobFormData>>({});

  useEffect(() => {
    if (editJob) {
      setFormData({
        title: editJob.title,
        company: editJob.company,
        deadline: editJob.deadline,
        contact: editJob.contact,
      });
    } else {
      setFormData({
        title: '',
        company: '',
        deadline: '',
        contact: '',
      });
    }
    setErrors({});
  }, [editJob, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<JobFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    }
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact information is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editJob ? 'Edit Job' : 'Add New Job'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g. Software Developer"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="e.g. Tech Corp Ltd."
              className={errors.company ? 'border-red-500' : ''}
            />
            {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Application Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => handleChange('deadline', e.target.value)}
              className={errors.deadline ? 'border-red-500' : ''}
            />
            {errors.deadline && <p className="text-sm text-red-500">{errors.deadline}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Information</Label>
            <Textarea
              id="contact"
              value={formData.contact}
              onChange={(e) => handleChange('contact', e.target.value)}
              placeholder="Email, phone, or address"
              className={errors.contact ? 'border-red-500' : ''}
              rows={3}
            />
            {errors.contact && <p className="text-sm text-red-500">{errors.contact}</p>}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editJob ? 'Update Job' : 'Add Job'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};