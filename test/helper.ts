import {ApiServer} from '../src/server';
import {LoggerApi} from '../src/logger';
import {NoopLoggerService} from '../src/logger/logger-noop.service';

export function buildApiServer(enableLogging?: boolean): ApiServer {
  const apiServer = new ApiServer();

  if (!enableLogging) {
    apiServer.bind(LoggerApi).to(NoopLoggerService);
  }

  return apiServer;
}
