import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Building2, Phone, Edit, Trash2 } from 'lucide-react';
import { Job } from '@/types/Job';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

export const JobCard = ({ job, onEdit, onDelete }: JobCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isDeadlinePassed = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDeadline(job.deadline);
  const deadlinePassed = isDeadlinePassed(job.deadline);

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {job.title}
          </CardTitle>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(job)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(job.id)}
              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Building2 className="h-4 w-4" />
          <span>{job.company}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <CalendarDays className="h-4 w-4" />
          <span className={deadlinePassed ? 'text-red-600' : 'text-gray-600'}>
            Deadline: {formatDate(job.deadline)}
          </span>
          {!deadlinePassed && (
            <Badge variant={daysLeft <= 3 ? 'destructive' : daysLeft <= 7 ? 'default' : 'secondary'}>
              {daysLeft === 0 ? 'Today' : daysLeft === 1 ? '1 day left' : `${daysLeft} days left`}
            </Badge>
          )}
          {deadlinePassed && (
            <Badge variant="destructive">Expired</Badge>
          )}
        </div>

        <div className="flex items-start space-x-2 text-sm text-gray-600">
          <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span className="break-words">{job.contact}</span>
        </div>

        <div className="text-xs text-gray-400 pt-2 border-t">
          Added: {formatDate(job.createdAt)}
        </div>
      </CardContent>
    </Card>
  );
};