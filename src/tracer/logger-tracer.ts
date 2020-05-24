import {Container, ObjectFactory} from 'typescript-ioc';
import {Tracer, initGlobalTracer, globalTracer, SpanOptions, Span} from 'opentracing';
import {LoggerApi} from '../logger';

class LoggerSpan extends Span {
  constructor(private logger: LoggerApi, private name: string, private options?: SpanOptions) {
    super();
  }

  log(keyValuePairs: { [p: string]: any }, timestamp?: number): this {
    this.logger.info(Object.assign({name: this.name}, keyValuePairs, this.options.tags));

    return this;
  }

  logEvent(event: string, payload?: any) {
    this.logger.info({event, payload});
  }
}

function initTracer() {
  const tracer: Tracer = new Tracer();

  const logger: LoggerApi = Container.get(LoggerApi);

  tracer.startSpan = (name: string, options?: SpanOptions) => {
    return new LoggerSpan(logger, name, options);
  };

  initGlobalTracer(tracer);
}
initTracer();

const loggerTracerFactory: ObjectFactory = () => {
  return globalTracer();
}

export default loggerTracerFactory;