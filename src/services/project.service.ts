import {Inject} from 'typescript-ioc';

import {ProjectApi} from './project.api';
import {ProjectModel} from '../models';
import {timer} from '../util';
import {projects} from './data';
import {LoggerApi} from '../logger';

export class ProjectServiceConfig {
  get timeout(): number {
    return 1000;
  }
}

export class ProjectService implements ProjectApi {
  @Inject
  private readonly config: ProjectServiceConfig;
  @Inject
  private readonly _logger: LoggerApi;

  get logger(): LoggerApi {
    return this._logger.child('ProjectService');
  }

  async listProjects(): Promise<ProjectModel[]> {
    this.logger.info('Listing projects');

    return timer(
      projects.slice(0),
      this.config.timeout);
  }

  async getProject(name: string): Promise<ProjectModel | undefined> {
    this.logger.info('Getting project: ' + name);

    return timer(
      projects.find(project => project.name === name),
      this.config.timeout);
  }

  async getProjectById(id: number): Promise<ProjectModel | undefined> {
    this.logger.info('Getting project by id: ' + id);

    return timer(
      projects.find(project => project.id === id),
      this.config.timeout);
  }
}
