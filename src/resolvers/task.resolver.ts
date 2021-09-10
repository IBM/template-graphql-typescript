import {Inject} from 'typescript-ioc';
import {Arg, FieldResolver, Mutation, Query, Resolver, Root} from 'type-graphql';

import {Task} from '../schemas';
import {ProjectModel, TaskModel} from '../models';
import {resolverManager} from './_resolver-manager';
import {ProjectApi, TaskApi} from '../services';

@Resolver(of => Task)
export class TaskResolver {
  @Inject
  taskService: TaskApi;
  @Inject
  projectService: ProjectApi;

  @Query(returns => [Task])
  async tasks(): Promise<TaskModel[]> {
    return this.taskService.listTasks();
  }

  @Query(returns => Task, { nullable: true })
  async task(@Arg("id") id: number): Promise<TaskModel | undefined> {
    return this.taskService.getTask(id);
  }

  @Mutation(returns => Task)
  async markTaskAsCompleted(@Arg("id") taskId: number): Promise<TaskModel> {
    return this.taskService.markAsCompleted(taskId);
  }

  @FieldResolver()
  async project(@Root() taskData: TaskModel): Promise<ProjectModel | undefined> {
    return this.projectService.getProjectById(taskData.project_id);
  }
}

resolverManager.registerResolver(TaskResolver);
