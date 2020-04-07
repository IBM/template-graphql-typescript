import {Container} from 'typescript-ioc';

import {ProjectApi, TaskApi} from '../../src/services';
import {TaskResolver} from '../../src/resolvers';
import {ProjectModel, TaskModel} from '../../src/models';
import {mockProjectApiProvider, mockTaskApiProvider} from './test-helpers';
import Mock = jest.Mock;

describe('task.resolver', () => {
  let classUnderTest: TaskResolver;
  let projectService: ProjectApi;
  let taskService: TaskApi;

  test('canary verifies test infrastructure', () => {
    expect(true).toEqual(true);
  });

  beforeEach(() => {
    Container.bind(ProjectApi).factory(mockProjectApiProvider);
    Container.bind(TaskApi).factory(mockTaskApiProvider);

    classUnderTest = Container.get(TaskResolver);
    projectService = Container.get(ProjectApi);
    taskService = Container.get(TaskApi);
  });

  describe('tasks()', () => {
    const expectedResult = [{id: 1, title: 'test'}];
    let mock: Mock;

    beforeEach(() => {
      mock = (taskService.listTasks as Mock);
      mock.mockResolvedValue(expectedResult);
    });

    test('should return value from taskService.listTasks()', async () => {

      expect(await classUnderTest.tasks()).toBe(expectedResult);
    });
  });

  describe('task(id:)', () => {
    const expectedResult = {id: 1, title: 'test'};
    let mock: Mock;

    beforeEach(() => {
      mock = (taskService.getTask as Mock);
      mock.mockResolvedValue(expectedResult);
    });

    test('should return value from taskService.getTask(id:)', async () => {
      const taskId = 1;

      expect(await classUnderTest.task(taskId)).toBe(expectedResult);

      expect(mock.mock.calls[0][0]).toEqual(taskId);
    });
  });

  describe('markTaskAsCompleted(id:)', () => {
    const expectedResult = {id: 1, title: 'test'};
    let mock: Mock;

    beforeEach(() => {
      mock = (taskService.markAsCompleted as Mock);
      mock.mockResolvedValue(expectedResult);
    });

    test('should return value from taskService.markAsCompleted(id:)', async () => {
      const taskId = 1;

      expect(await classUnderTest.markTaskAsCompleted(taskId)).toBe(expectedResult);

      expect(mock.mock.calls[0][0]).toEqual(taskId);
    });
  });

  describe('project(taskData:)', () => {
    const expectedResult = {id: 1, name: 'test'};
    let mock: Mock;

    beforeEach(() => {
      mock = (projectService.getProjectById as Mock);
      mock.mockResolvedValue(expectedResult);
    });

    test('should return value from projectService.getProjectById(id:)', async () => {
      const projectId = 1;

      expect(await classUnderTest.project({project_id: projectId} as TaskModel)).toBe(expectedResult);

      expect(mock.mock.calls[0][0]).toEqual(projectId);
    });
  });
});
