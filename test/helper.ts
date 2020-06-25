import {ApiServer} from '../src/server';
import {LoggerApi} from '../src/logger';
import {NoopLoggerService} from '../src/logger/logger-noop.service';
import {TracerApi} from '../src/tracer';
import noopTracerFactory from '../src/tracer/noop-tracer.factory';

export function buildApiServer(enableLogging?: boolean): ApiServer {
  const apiServer = new ApiServer();

  if (!enableLogging) {
    apiServer.bind(LoggerApi).to(NoopLoggerService);
  }

  apiServer.bind(TracerApi).factory(noopTracerFactory);

  return apiServer;
}
