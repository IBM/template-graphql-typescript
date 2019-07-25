import {Provides, Singleton} from 'typescript-ioc';

import {TaskApi} from './task.api';
import {ProjectModel, TaskModel} from '../models';
import {timer} from '../util';
import {projects, tasks} from './data';

@Singleton
@Provides(TaskApi)
export class TaskService implements TaskApi {
  async listTasks(): Promise<TaskModel[]> {
    return timer(tasks.slice(0), 1000);
  }

  async getTasksForProject(projectId: number): Promise<TaskModel[]> {
    return timer(
      tasks.filter(task => task.project_id === projectId),
      1000);
  }

  async getProjectForTask(taskData: TaskModel): Promise<ProjectModel> {
    return timer(projects.find(project => project.id === taskData.project_id), 1000);
  }

  async getTask(id: number): Promise<TaskModel | undefined> {
    return timer<TaskModel | undefined>(tasks.find(task => task.id === id), 1000);
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

    return timer(task, 1000);
  }

}
