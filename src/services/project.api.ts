import {ProjectModel, TaskModel} from '../models';

export abstract class ProjectApi {
  abstract listProjects(): Promise<ProjectModel[]>;
  abstract getProjectById(id: number): Promise<ProjectModel | undefined>;
  abstract getProject(name: string): Promise<ProjectModel | undefined>;
}
