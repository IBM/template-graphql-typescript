import {Inject} from 'typescript-ioc';
import {Arg, FieldResolver, Query, Resolver, Root} from 'type-graphql';

import {Project, Task} from '../schemas';
import {ProjectModel, TaskModel} from '../models';
import {resolverManager} from './_resolver-manager';
import {ProjectApi, TaskApi} from '../services';
import {TracerApi} from '../tracer';
import {SpanOptions} from 'opentracing';
import Span from 'opentracing/lib/span';
import {traceError, traceResponse, traceStart} from '../util/opentracing/formatters';

@Resolver(of => Project)
export class ProjectResolver {
  @Inject
  projectService: ProjectApi;
  @Inject
  taskService: TaskApi;
  @Inject
  tracer: TracerApi;

  startSpan(methodName: string, options?: SpanOptions) {
    const span: Span = this.tracer.startSpan(`ProjectResolver.${methodName}`, options);

    return span;
  }

  @Query(returns => [Project])
  async projects(): Promise<ProjectModel[]> {
    const span: Span = this.startSpan('projects');

    try {
      traceStart(span);

      const projects: ProjectModel[] = await this.projectService.listProjects();

      traceResponse(span, {response: projects});

      return projects;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }

  @Query(returns => Project, { nullable: true })
  async project(@Arg("name") name: string): Promise<ProjectModel | undefined> {
    const span: Span = this.startSpan('project');

    try {
      traceStart(span, {name});

      const project: ProjectModel = await this.projectService.getProject(name);

      traceResponse(span, {response: project});

      return project;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }

  @FieldResolver()
  async tasks(@Root() projectData: ProjectModel): Promise<TaskModel[]> {
    const span: Span = this.startSpan('tasks');

    try {
      traceStart(span, {project: projectData});

      const tasks: TaskModel[] = await this.taskService.getTasksForProject(projectData.id);

      traceResponse(span, {response: tasks});

      return tasks;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }
}

resolverManager.registerResolver(ProjectResolver);
