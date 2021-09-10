import {TaskModel} from '../models';

export abstract class TaskApi {
  abstract listTasks(): Promise<TaskModel[]>;
  abstract getTask(id: number): Promise<TaskModel | undefined>;
  abstract markAsCompleted(taskId: number): Promise<TaskModel>;
  abstract getTasksForProject(projectId: number): Promise<TaskModel[]>;
}
