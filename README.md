## 1. Auth System 
**Title**: Implement User Authentication and Role Management  
**Description**  
- [ ] JWT-based login/signup (BE)
- [ ] Role-based access control (Client/Contractor/Architect/etc.) (BE)
- [ ] Profile management page (FE)
**Labels**: P0, backend, frontend

## 2. Project Core
**Title**: Project Creation & Assignment  
**Description**  
- [ ] API: Create projects with status (Not Started/In Progress/Delayed/Completed) (BE)
- [ ] Assign users to projects with roles (FE/BE)
- [ ] Project dashboard overview (FE)
**Labels**: P0, backend, frontend

## 3. Task System
**Title**: Task Management Module  
**Description**  
- [ ] API: Create/assign tasks with deadlines (BE)
- [ ] Task status tracking (Not Started/In Progress/Completed) (FE/BE)
- [ ] Comment threads per task (FE/BE)
- [ ] Task list UI with filters (FE)
**Labels**: P0, backend, frontend


## 4. File Sharing 
**Title**: File Upload/Download with Permissions  
**Description**  
- [ ] File upload API (AWS S3/Firebase) (BE)
- [ ] Role-based file access control (BE)
- [ ] File browser UI per project (FE)
**Labels**: P0, backend, frontend


## 5. Activity Feed
**Title**: Real-time Activity Log  
**Description**  
- [ ] Audit log API (track: user + action + timestamp) (BE)
- [ ] Filterable activity feed UI (by user/task) (FE)
- [ ] Auto-refresh every 5min (FE)
**Labels**: P0, backend, frontend


## 6. Reporting Engine 
**Title**: Automated PDF Report Generation  
**Description**  
- [ ] API: Generate PDFs with (BE):
  - Project status summary
  - Task completion rates
  - Delayed tasks list
  - Upcoming milestones
- [ ] "Export Report" button (FE)
- [ ] PDF template design (FE/BE)
**Labels**: P0, backend, frontend


## 7. Calendar View (P1)
**Title**: Basic Gantt/Calendar UI  
**Description**  
- [ ] API: Get tasks with deadlines (BE)
- [ ] Visual timeline of tasks (FE - use `react-gantt` or similar)
**Labels**: P1, frontend