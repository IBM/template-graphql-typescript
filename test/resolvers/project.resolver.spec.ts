import {Container} from 'typescript-ioc';

import {ProjectApi, TaskApi} from '../../src/services';
import {ProjectResolver} from '../../src/resolvers';
import {ProjectModel} from '../../src/models';
import {mockProjectApiProvider, mockTaskApiProvider} from './test-helpers';
import Mock = jest.Mock;

describe('project.resolver', () => {
  let classUnderTest: ProjectResolver;
  let projectService: ProjectApi;
  let taskService: TaskApi;

  test('canary verifies test infrastructure', () => {
    expect(true).toEqual(true);
  });

  beforeEach(() => {
    Container.bind(ProjectApi).factory(mockProjectApiProvider);
    Container.bind(TaskApi).factory(mockTaskApiProvider);

    classUnderTest = Container.get(ProjectResolver);
    projectService = Container.get(ProjectApi);
    taskService = Container.get(TaskApi);
  });

  describe('projects()', () => {
    const expectedResult = [{id: 1, name: 'test'}];
    let mock: Mock;

    beforeEach(() => {
      mock = (projectService.listProjects as Mock);
      mock.mockResolvedValue(expectedResult);
    });

    test('should return value from projectService.listProjects()', async () => {

      expect(await classUnderTest.projects()).toBe(expectedResult);
    });
  });

  describe('project(name:)', () => {
    const expectedResult = {id: 1, name: 'test'};
    let mock: Mock;

    beforeEach(() => {
      mock = (projectService.getProject as Mock);
      mock.mockResolvedValue(expectedResult);
    });

    test('should return value from projectService.getProject(name:)', async () => {
      const name = 'project name';

      expect(await classUnderTest.project(name)).toBe(expectedResult);

      expect(mock.mock.calls[0][0]).toEqual(name);
    });
  });

  describe('tasks(projectData:)', () => {
    const expectedResult = [{id: 1, title: 'test'}];
    let mock: Mock;

    beforeEach(() => {
      mock = (taskService.getTasksForProject as Mock);
      mock.mockResolvedValue(expectedResult);
    });

    test('should return value from taskService.getTasksForProject(id:)', async () => {
      const projectId = 99;

      expect(await classUnderTest.tasks({id: projectId} as ProjectModel)).toBe(expectedResult);

      expect(mock.mock.calls[0][0]).toEqual(projectId);
    });
  });
});
