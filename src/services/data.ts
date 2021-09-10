import {ProjectModel, TaskModel} from '../models';

export const projects: ProjectModel[] = [
  { id: 1, name: "Learn React Native" },
  { id: 2, name: "Workout" },
  { id: 3, name: "Other" },
];

export const tasks: TaskModel[] = [
  { id: 1, title: "Install Node", completed: true, project_id: 1 },
  { id: 2, title: "Install React Native CLI:", completed: false, project_id: 1},
  { id: 3, title: "Install Xcode", completed: false, project_id: 1 },
  { id: 4, title: "Morning Jog", completed: true, project_id: 2 },
  { id: 5, title: "Visit the gym", completed: false, project_id: 2 },
];
