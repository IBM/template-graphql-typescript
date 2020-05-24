import {Inject} from 'typescript-ioc';

import {ProjectApi} from './project.api';
import {ProjectModel} from '../models';
import {timer} from '../util';
import {projects} from './data';
import {TracerApi} from '../tracer';
import {SpanOptions} from 'opentracing';
import Span from 'opentracing/lib/span';
import {traceError, traceResponse, traceStart} from '../util/opentracing/formatters';

export class ProjectServiceConfig {
  get timeout(): number {
    return 1000;
  }
}

export class ProjectService implements ProjectApi {
  @Inject
  private readonly config: ProjectServiceConfig;
  @Inject
  tracer: TracerApi;

  startSpan(methodName: string, options?: SpanOptions) {
    const span: Span = this.tracer.startSpan(`ProjectService.${methodName}`, options);

    return span;
  }

  async listProjects(): Promise<ProjectModel[]> {
    const span: Span = this.startSpan('listProjects');

    try {
      traceStart(span);

      const projects: ProjectModel[] = await timer(
        projects.slice(0),
        this.config.timeout);

      traceResponse(span, {response: projects});

      return projects;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }

  async getProject(name: string): Promise<ProjectModel | undefined> {
    const span: Span = this.startSpan('getProject');

    try {
      traceStart(span, {name});

      const project: ProjectModel = await timer(
        projects.find(project => project.name === name),
        this.config.timeout);

      traceResponse(span, {response: project});

      return project;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }

  async getProjectById(id: number): Promise<ProjectModel | undefined> {
    const span: Span = this.startSpan('getProjectById');

    try {
      traceStart(span, {id});

      const project: ProjectModel = await timer(
        projects.find(project => project.id === id),
        this.config.timeout);

      traceResponse(span, {response: project});

      return project;
    } catch (error) {
      traceError(span, error, true);
    } finally {
      span.finish();
    }
  }
}
