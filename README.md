# Application Layout Architecture Next.js

task-manager/
├── app
│ ├── app.tsx # Main application component
│ ├── global.css #Styling file
│ └── layout.tsx # Main layout of application
├── components/ # UI Components
│ ├── TaskForm.tsx # Add/edit task form
│ ├── TaskList.tsx # Task listing component
│ ├── TaskItem.tsx # Individual task item
│ ├── FilterBar.tsx # Filtering and search controls
│ ├── Statistics.tsx # Task statistics dashboard
│ └── Layout.tsx # Main layout wrapper
├── hooks/ # Custom React hooks
│ ├── useTasks.ts # Task management logic
│ └── useLocalStorage.ts # Local storage abstraction
├── types/ # TypeScript type definitions
│ └── task.ts
├── utils/ # Utility functions
│ ├── storage.ts # Local storage operations
│ └── helpers.ts # Helper functions

# Prerequisites

git clone <[github-link](https://github.com/mikedalu/task-manager.git)>
cd task-manager
npm install

npm install
npm run dev

# Building for Production

npm run build

# Start production server

npm start
