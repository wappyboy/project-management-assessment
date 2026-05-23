# Project Management Tool - Front-End Developer Assessment

A simple project management tool built for a Front-End Developer assessment. The application allows members to register, sign in, create and update projects, manage tasks within each project, update task statuses using drag-and-drop, and view change logs for task updates.

The goal of this project is to demonstrate frontend development skills, clean code structure, API integration, reusable components, responsive UI design, and problem-solving ability when working with a provided backend API.

---

## Live Demo

Vercel Deployment:

```txt
(https://project-management-assessment.vercel.app/)
```

GitHub Repository:

```txt
(https://github.com/wappyboy/project-management-assessment.git)
```

---

## Tech Stack

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Axios**
- **dnd-kit**
- **Framer Motion**
- **lucide-react**

---

## Features

### Authentication

- Member registration
- Member login
- Basic form validation
- Local session handling
- Logout functionality

### Project Management

- Create projects
- View project list
- Open project detail page
- Update/edit project name and description
- Manage tasks within each project
- Paginated project list for better usability

### Task Management

- Create tasks associated with a project
- Display tasks by status:
  - Todo
  - In Progress
  - Done
- View task count summaries per project

### Drag-and-Drop

- Drag tasks between Todo, In Progress, and Done columns
- Update task status through the provided API
- Uses optimistic UI updates for a smoother user experience
- Reverts the UI if the API update fails

### Change Logs

- Creates a change log whenever a task status changes
- Displays task update history for the current project
- Shows old status, new status, and remarks

### UI / UX

- Modern responsive layout
- Reusable UI components
- Loading states
- Error messages
- Dashboard and project detail views
- Clean card-based interface
- Subtle Framer Motion animations
- Responsive layout for mobile, tablet, and desktop screens

---

## Provided API

The project uses the backend API provided in the assessment:

```txt
https://m-backend.dowinnsys.com/api_test
```

Main endpoints used:

```txt
POST  /testlogin

POST  /test01/create_member
GET   /test01/get_all_member

POST  /test02/create_project
GET   /test02/get_all_project
PATCH /test02/patch_project

POST  /test03/create_task
GET   /test03/get_all_task
PATCH /test03/patch_task

POST  /test04/create_changelog
GET   /test04/get_all_change_log
```

---

## Project Structure

```txt
src/
  app/
    login/
    register/
    dashboard/
    projects/
      [projectId]/

  components/
    auth/
    layout/
    logs/
    projects/
    tasks/
    ui/

  features/
    auth/
    members/
    projects/
    tasks/
    change-logs/

  lib/
    api.ts
    constants.ts
    utils.ts
```

---

## Folder Explanation

### `app/`

Contains the Next.js routes and pages.

Examples:

- `/login`
- `/register`
- `/dashboard`
- `/projects/[projectId]`

### `components/`

Contains reusable UI and feature components.

Examples:

- `Button`
- `Input`
- `PageHeader`
- `StatCard`
- `ErrorMessage`
- `MotionContainer`
- `ProjectForm`
- `ProjectEditForm`
- `ProjectList`
- `ProjectCard`
- `TaskForm`
- `TaskBoard`
- `TaskColumn`
- `TaskCard`
- `ChangeLogList`

### `features/`

Contains feature-specific API services and TypeScript types.

Examples:

- `auth`
- `members`
- `projects`
- `tasks`
- `change-logs`

### `lib/`

Contains shared utilities such as:

- Axios API client
- Shared constants
- Tailwind class helper

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/wappyboy/project-management-assessment.git)
cd project-management-assessment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://m-backend.dowinnsys.com/api_test
```

If API requests fail depending on the backend configuration, use:

```env
NEXT_PUBLIC_API_BASE_URL=https://m-backend.dowinnsys.com
```

### 4. Run the development server

```bash
npm run dev
```

Open the app in your browser:

```txt
http://localhost:3000
```

---

## Available Scripts

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Start production build locally

```bash
npm run start
```

### Run lint check

```bash
npm run lint
```

---

## API Integration Notes

While integrating the provided backend API, some request and response fields were inconsistent.

For example, creating a project requires:

```json
{
  "user_id": "user_id",
  "name": "Project name",
  "description": "Project description"
}
```

But the project list response returns:

```json
{
  "id": 1,
  "name": "Project name",
  "description": "Project description"
}
```

Because of this, the frontend service layer was adjusted based on the actual API response format.

The API service files help keep backend-specific details separated from UI components.

---

## Authentication Notes

The provided login endpoint does not clearly return a token-based authentication response.

Because of this, the application uses a local session fallback for accounts created through the app. This is used only to support the frontend assessment flow.

In a production application, authentication should be handled securely by the backend using:

- Hashed passwords
- Access tokens or secure sessions
- Proper authorization checks

---

## Rate Limit Handling

During development testing, the provided API sometimes returned:

```txt
429 Too Many Requests
```

To reduce unnecessary API calls, lightweight client-side caching was added for:

- Projects
- Tasks
- Change logs

The app also prevents duplicate initial fetches that may happen in development because of React Strict Mode.

---

## Known Limitations

- Delete functionality was not implemented because the provided API documentation does not show delete endpoints.
- The project list endpoint does not return the project owner or `user_id`, so projects cannot be reliably filtered by the logged-in user.
- Authentication uses a local fallback because the API does not clearly provide token-based authentication.
- The database initialization endpoint was not implemented because this submission focuses on the frontend and uses the provided backend API.
- Some API response fields differ from the request body fields, so the frontend adapts through service-layer handling.

---

## Future Improvements

- Add project delete functionality if the backend supports it
- Add task edit functionality
- Add task delete functionality if the backend supports it
- Add pagination for tasks and change logs
- Add better authentication if token support becomes available
- Add unit tests for components and API services
- Improve accessibility for keyboard-based drag-and-drop
- Improve deployment handling if API rate limits or CORS restrictions occur

---

## Technical Decisions

### Why Next.js?

Next.js was used because it was the preferred framework in the assessment. It provides clean routing, good developer experience, and easy deployment options.

### Why TypeScript?

TypeScript was used to define clear data structures for members, projects, tasks, and change logs. This helps reduce mistakes during API integration.

### Why Tailwind CSS?

Tailwind CSS was used to quickly build a clean, responsive, and consistent interface without writing large custom CSS files.

### Why Axios?

Axios was used through a centralized API client and service files. This keeps API calls organized and prevents endpoint logic from being repeated inside UI components.

### Why dnd-kit?

dnd-kit was used for drag-and-drop because it is modern, lightweight, and works well with React and TypeScript.

### Why Framer Motion?

Framer Motion was used for subtle UI animations to improve user experience without distracting from the main functionality.

### Why reusable components?

Reusable components such as `Button`, `Input`, `PageHeader`, `StatCard`, `ErrorMessage`, and `MotionContainer` were created to keep the UI consistent and reduce repeated code.

---

## Assessment Coverage

| Requirement | Status |
|---|---|
| Use Next.js / React / Vue | Completed |
| Use Tailwind CSS | Completed |
| Use Axios for API calls | Completed |
| Member sign-up/sign-in | Completed |
| Create projects | Completed |
| Update projects | Completed |
| Manage tasks within projects | Completed |
| Create tasks | Completed |
| Drag-and-drop task status updates | Completed |
| Change logs for task updates | Completed |
| Fetch change log history | Completed |
| README documentation | Completed |
| Hosted deployment | Completed |

---

## Author

**Ralph Eco**

Front-End Developer Assessment Submission
