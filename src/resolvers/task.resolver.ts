import {Inject} from 'typescript-ioc';
import {Arg, FieldResolver, Mutation, Query, Resolver, Root} from 'type-graphql';

import {Task} from '../schemas';
import {ProjectModel, TaskModel} from '../models';
import {resolverManager} from './_resolver-manager';
import {ProjectApi, TaskApi} from '../services';
import {TracerApi} from '../tracer';
import {Span, SpanOptions} from 'opentracing';
import {traceError, traceResponse, traceStart} from '../util/opentracing/formatters';

@Resolver(of => Task)
export class TaskResolver {
  @Inject
  taskService: TaskApi;
  @Inject
  projectService: ProjectApi;
  @Inject
  tracer: TracerApi;

  startSpan(methodName: string, context?: SpanOptions): Span {
    const span: Span = this.tracer.startSpan(`TaskResolver.${methodName}`, context);

    return span;
  }

  @Query(returns => [Task])
  async tasks(): Promise<TaskModel[]> {
    const span: Span = this.startSpan('tasks');

    try {
      traceStart(span);

      const tasks: TaskModel[] = await this.taskService.listTasks();

      traceResponse(span, {response: tasks});

      return tasks;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }

  @Query(returns => Task, { nullable: true })
  async task(@Arg("id") id: number): Promise<TaskModel | undefined> {
    const span: Span = this.startSpan('task');

    try {
      traceStart(span, {id});

      const task: TaskModel = await this.taskService.getTask(id);

      traceResponse(span, {response: task});

      return task;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }

  @Mutation(returns => Task)
  async markTaskAsCompleted(@Arg("id") taskId: number): Promise<TaskModel> {
    const span: Span = this.startSpan('markTaskAsCompleted');

    try {
      traceStart(span, {taskId});

      const task: TaskModel = await this.taskService.markAsCompleted(taskId);

      traceResponse(span, {response: task});

      return task;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }

  @FieldResolver()
  async project(@Root() taskData: TaskModel): Promise<ProjectModel | undefined> {
    const span: Span = this.startSpan('markTaskAsCompleted');

    try {
      traceStart(span, {task: taskData});

      const project: ProjectModel = await this.projectService.getProjectById(taskData.project_id);

      traceResponse(span, {response: project});

      return project;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }
}

resolverManager.registerResolver(TaskResolver);
