import {Container, Scope} from 'typescript-ioc';
import {LoggerApi} from './logger.api';
import {PinoLoggerService} from './logger-pino.service';

export * from './logger.api';

Container.bind(LoggerApi).to(PinoLoggerService).scope(Scope.Singleton);
