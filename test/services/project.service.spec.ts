import {ProjectServiceConfig, ProjectService} from '../../src/services';
import {Container} from 'typescript-ioc';

describe('project.service', () => {
  test('canary verifies test infrastructure', () => {
      expect(true).toEqual(true);
  });

  describe('ProjectService', () => {
    let service: ProjectService;
    beforeEach(() => {
      Container
        .bind(ProjectServiceConfig)
        .factory(() => ({timeout: 2}));

      service = Container.get(ProjectService);
    });

    describe('given listProjects()', () => {
      test('should return a non-empty array of projects', async () => {
        const actualProjects = await service.listProjects();

        expect(actualProjects.length).toBeGreaterThan(0);
      });
    });

    describe('given getProject()', () => {
      context('when `name` matches project', () => {
        test('then return project with `name`', async () => {
          const name = 'Workout';

          const actualProject = await service.getProject(name);

          expect(actualProject).not.toBeUndefined();
          expect(actualProject.name).toEqual(name);
        });
      });

      context('when `name` does not match a project', () => {
        test('then return undefined', async () => {
          expect(await service.getProject('bogus')).toBeUndefined();
        });
      });
    });

    describe('given getProjectById()', () => {
      context('when `id` matches a project', () => {
        test('then return the project', async () => {
          const id = 1;

          const actualProject = await service.getProjectById(id);

          expect(actualProject).not.toBeUndefined();
          expect(actualProject.id).toEqual(id);
        });
      });

      context('when `id` does not match a project', () => {
        test('then return undefined', async () => {
          expect(await service.getProjectById(100)).toBeUndefined();
        });
      });
    });
  });

  describe('ProjectServiceConfig', () => {
    let config: ProjectServiceConfig;
    beforeEach(() => {
      config = new ProjectServiceConfig();
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
