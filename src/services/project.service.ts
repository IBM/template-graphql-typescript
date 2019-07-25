import {Provides, Singleton} from 'typescript-ioc';

import {ProjectApi} from './project.api';
import {ProjectModel, TaskModel} from '../models';
import {timer} from '../util';
import {projects, tasks} from './data';

@Singleton
@Provides(ProjectApi)
export class ProjectService implements ProjectApi {

  async listProjects(): Promise<ProjectModel[]> {
    return timer(
      projects.slice(0),
      1000);
  }

  async getProject(name: string): Promise<ProjectModel | undefined> {
    return timer(
      projects.find(project => project.name === name),
      1000);
  }

  async getProjectById(id: number): Promise<ProjectModel | undefined> {
    return timer(
      projects.find(project => project.id === id),
      1000);
  }
}
