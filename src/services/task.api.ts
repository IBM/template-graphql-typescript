import {TaskModel} from '../models';

export abstract class TaskApi {
  abstract async listTasks(): Promise<TaskModel[]>;
  abstract async getTask(id: number): Promise<TaskModel | undefined>;
  abstract async markAsCompleted(taskId: number): Promise<TaskModel>;
  abstract async getTasksForProject(projectId: number): Promise<TaskModel[]>;
}
