import {TaskService, TaskServiceConfig} from '../../src/services';
import {Container} from 'typescript-ioc';
import {when} from 'q';

describe('task.service', () => {
  test('canary verifies test infrastructure', () => {
      expect(true).toEqual(true);
  });

  describe('TaskService', () => {
    let service: TaskService;
    beforeEach(() => {
      Container
        .bind(TaskServiceConfig)
        .factory(() => ({timeout: 2}));

      service = Container.get(TaskService);
    });

    describe('given listTasks()', () => {
      test('should return list of tasks', async () => {
        expect((await service.listTasks()).length).toBeGreaterThan(0);
      });
    });

    describe('given getTask()', () => {
      context('when task with id is found', () => {
        test('then return task', async () => {
          const id = 1;

          const actualTask = await service.getTask(id);

          expect(actualTask).not.toBeUndefined();
          expect(actualTask.id).toEqual(id);
        });
      });

      context('when task with id is not found', () => {
        test('then return undefined', async () => {
          expect(await service.getTask(1000)).toBeUndefined();
        });
      });
    });

    describe('given getTasksForProject()', () => {
      context('when project has tasks', () => {
        test('then return tasks', async () => {
          const tasks = await service.getTasksForProject(1);

          expect(tasks.length).toEqual(3);
        });
      });

      context('when project has no tasks', () => {
        test('then return empty array', async () => {
          const tasks = await service.getTasksForProject(3);

          expect(tasks.length).toEqual(0);
        });
      });

      context('when project does not exist', () => {
        test('then return empty array', async () => {
          const tasks = await service.getTasksForProject(1000);

          expect(tasks.length).toEqual(0);
        });
      });
    });

    describe('given markAsComplete()', () => {
      context('when task has not been completed', () => {
        test('then mark task as completed and return task', async () => {
          const taskId = 2;

          expect((await service.markAsCompleted(taskId)).completed).toEqual(true);

          expect((await service.getTask(taskId)).completed).toEqual(true);
        });
      });

      context('when task is already completed', () => {
        test('then throw an error', async () => {
          const taskId = 1;
          return service.markAsCompleted(taskId)
            .then(task => fail('should throw error'))
            .catch(err => {
              expect(err.message).toEqual(`Task with id ${taskId} is already completed`);
              return;
            });
        });
      });

      context('when task could not be found', () => {
        test('then throw an error', async () => {
          const taskId = 1000;
          return service.markAsCompleted(taskId)
            .then(task => fail('should throw error'))
            .catch(err => {
              expect(err.message).toEqual(`Couldn't find the task with id ${taskId}`);
              return;
            });
        });
      });
    });
  });

  describe('TaskServiceConfig', () => {
    let config: TaskServiceConfig;
    beforeEach(() => {
      config = new TaskServiceConfig();
    });

    describe('given timeout', () => {
      context('when called', () => {
        test('then should return 1000', async () => {
          expect(config.timeout).toEqual(1000);
        });
      });
    });
  });
});
