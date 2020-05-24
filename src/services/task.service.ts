import {Inject} from 'typescript-ioc';

import {TaskApi} from './task.api';
import {TaskModel} from '../models';
import {timer} from '../util';
import {tasks} from './data';
import {TracerApi} from '../tracer';
import {SpanOptions} from 'opentracing';
import Span from 'opentracing/lib/span';
import {traceError, traceResponse, traceStart} from '../util/opentracing/formatters';

export class TaskServiceConfig {
  get timeout(): number {
    return 1000;
  }
}

export class TaskService implements TaskApi {
  @Inject
  private readonly config: TaskServiceConfig;
  @Inject
  tracer: TracerApi;

  startSpan(methodName: string, options?: SpanOptions) {
    const span: Span = this.tracer.startSpan(`TaskService.${methodName}`, options);

    return span;
  }

  async listTasks(): Promise<TaskModel[]> {
    const span: Span = this.startSpan('listTasks');

    try {
      traceStart(span);

      const tasks: TaskModel[] = await timer(tasks.slice(0), this.config.timeout);

      traceResponse(span, {response: tasks});

      return tasks;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }

  async getTasksForProject(projectId: number): Promise<TaskModel[]> {
    const span: Span = this.startSpan('getTasksForProject');

    try {
      traceStart(span, {projectId});

      const tasks: TaskModel[] = await timer(
        tasks.filter(task => task.project_id === projectId),
        this.config.timeout);

      traceResponse(span, {response: tasks});

      return tasks;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }

  async getTask(id: number): Promise<TaskModel | undefined> {
    const span: Span = this.startSpan('getTask');

    try {
      traceStart(span, {id});

      const task: TaskModel = await timer<TaskModel | undefined>(
        tasks.find(task => task.id === id),
        this.config.timeout);

      traceResponse(span, {response: task});

      return task;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }

  async markAsCompleted(taskId: number): Promise<TaskModel> {
    const span: Span = this.startSpan('markAsCompleted');

    try {
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

      const response: TaskModel = await timer(task, this.config.timeout);

      traceResponse(span, {response});

      return response;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }
}
