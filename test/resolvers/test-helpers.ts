import {BuildContext, ObjectFactory} from 'typescript-ioc';
import {ProjectApi, TaskApi} from '../../src/services';

export const mockProjectApiProvider: ObjectFactory = (context?: BuildContext) => {
  const projectApi: ProjectApi = {
    listProjects: jest.fn() as any,
    getProjectById: jest.fn() as any,
    getProject: jest.fn() as any,
  };

  return projectApi;
};

export const mockTaskApiProvider: ObjectFactory = (context?: BuildContext) => {
  const taskApi: TaskApi = {
    getTask: jest.fn() as any,
    getTasksForProject: jest.fn() as any,
    listTasks: jest.fn() as any,
    markAsCompleted: jest.fn() as any,
  };

  return taskApi;
};
