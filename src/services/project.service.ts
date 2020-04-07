import {Inject} from 'typescript-ioc';

import {ProjectApi} from './project.api';
import {ProjectModel} from '../models';
import {timer} from '../util';
import {projects} from './data';

export class ProjectServiceConfig {
  get timeout(): number {
    return 1000;
  }
}

export class ProjectService implements ProjectApi {
  @Inject
  private readonly config: ProjectServiceConfig;

  async listProjects(): Promise<ProjectModel[]> {
    return timer(
      projects.slice(0),
      this.config.timeout);
  }

  async getProject(name: string): Promise<ProjectModel | undefined> {
    return timer(
      projects.find(project => project.name === name),
      this.config.timeout);
  }

  async getProjectById(id: number): Promise<ProjectModel | undefined> {
    return timer(
      projects.find(project => project.id === id),
      this.config.timeout);
  }
}
