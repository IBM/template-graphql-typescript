import {Inject} from 'typescript-ioc';

import {TaskApi} from './task.api';
import {TaskModel} from '../models';
import {timer} from '../util';
import {tasks} from './data';

export class TaskServiceConfig {
  get timeout(): number {
    return 1000;
  }
}

export class TaskService implements TaskApi {
  @Inject
  private readonly config: TaskServiceConfig;

  async listTasks(): Promise<TaskModel[]> {
    return timer(tasks.slice(0), this.config.timeout);
  }

  async getTasksForProject(projectId: number): Promise<TaskModel[]> {
    return timer(
      tasks.filter(task => task.project_id === projectId),
      this.config.timeout);
  }

  async getTask(id: number): Promise<TaskModel | undefined> {
    return timer<TaskModel | undefined>(
      tasks.find(task => task.id === id),
      this.config.timeout);
  }

  async markAsCompleted(taskId: number): Promise<TaskModel> {
    const task = tasks.find(task => {
      return task.id === taskId;
    });

    if (!task) {
      throw new Error(`Couldn't find the task with id ${taskId}`);
    }

    if (task.completed === true) {
      throw new Error(`Task with id ${taskId} is already completed`);
    }

    task.completed = true;

    return timer(task, this.config.timeout);
  }

}
