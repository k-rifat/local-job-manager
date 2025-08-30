# MyJob - Local Job Circular Manager MVP

## Core Features
- Job listing management with CRUD operations
- Fields: Job Title, Company, Deadline, Contact
- Simple dashboard interface
- Local storage for data persistence

## Files to Create/Modify
1. **src/pages/Index.tsx** - Main dashboard with job listings and forms
2. **src/components/JobCard.tsx** - Individual job display component
3. **src/components/JobForm.tsx** - Add/Edit job form component
4. **src/types/Job.ts** - TypeScript interfaces for job data
5. **src/hooks/useJobs.ts** - Custom hook for job management
6. **index.html** - Update title to "MyJob"

## Implementation Plan
- Use localStorage for data persistence (no backend required)
- Simple responsive design with shadcn/ui components
- Basic validation for required fields
- Date picker for deadline field
- Modal for add/edit forms
- Delete confirmation

## MVP Scope
- Focus on core CRUD functionality
- Simple, clean interface
- Mobile responsive
- No user authentication (single user)
- No advanced filtering (keep it simple)