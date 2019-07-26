import {Provider} from 'typescript-ioc';
import {ProjectApi, TaskApi} from '../../src/services';

export class MockProjectApiProvider implements Provider {
  private projectApi: ProjectApi = {
    listProjects: jest.fn() as any,
    getProjectById: jest.fn() as any,
    getProject: jest.fn() as any,
  };

  get(): ProjectApi {
    return this.projectApi;
  }
};

export class MockTaskApiProvider implements Provider {
  private taskApi: TaskApi = {
    getTask: jest.fn() as any,
    getTasksForProject: jest.fn() as any,
    listTasks: jest.fn() as any,
    markAsCompleted: jest.fn() as any,
  };

  get(): TaskApi {
    return this.taskApi;
  }
}
