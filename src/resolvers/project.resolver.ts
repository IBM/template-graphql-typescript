import {Inject} from 'typescript-ioc';
import {Arg, FieldResolver, Query, Resolver, Root} from 'type-graphql';

import {Project, Task} from '../schemas';
import {ProjectModel, TaskModel} from '../models';
import {resolverManager} from './_resolver-manager';
import {ProjectApi, TaskApi} from '../services';

@Resolver(of => Project)
export class ProjectResolver {
  @Inject
  projectService: ProjectApi;
  @Inject
  taskService: TaskApi;

  @Query(returns => [Project])
  async projects(): Promise<ProjectModel[]> {
    return this.projectService.listProjects();
  }

  @Query(returns => Project, { nullable: true })
  async project(@Arg("name") name: string): Promise<ProjectModel | undefined> {
    return this.projectService.getProject(name);
  }

  @FieldResolver()
  async tasks(@Root() projectData: ProjectModel): Promise<TaskModel[]> {
    return this.taskService.getTasksForProject(projectData.id);
  }
}

resolverManager.registerResolver(ProjectResolver);
