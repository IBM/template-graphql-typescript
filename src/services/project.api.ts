import {ProjectModel, TaskModel} from '../models';

export abstract class ProjectApi {
  abstract async listProjects(): Promise<ProjectModel[]>;
  abstract async getProjectById(id: number): Promise<ProjectModel | undefined>;
  abstract async getProject(name: string): Promise<ProjectModel | undefined>;
}
