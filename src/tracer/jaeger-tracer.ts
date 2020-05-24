import {Container, ObjectFactory} from 'typescript-ioc';
import {initTracerFromEnv, JaegerTracer, ZipkinB3TextMapCodec} from 'jaeger-client'
import {Tracer, globalTracer, initGlobalTracer, FORMAT_HTTP_HEADERS} from 'opentracing';

import {LoggerApi} from '../logger';

const pkg = require('../../package.json');

function initTracer(): Tracer {
  const tags = {};
  tags[`${pkg.name}.version`] = pkg.version;

  const logger: LoggerApi = Container.get(LoggerApi);

  const config = {
    serviceName: pkg.name,
  };
  const options = {
    tags,
    logger,
  };

  const tracer: JaegerTracer = initTracerFromEnv(config, options);

  const codec = new ZipkinB3TextMapCodec({ urlEncoding: true });

  tracer.registerInjector(FORMAT_HTTP_HEADERS, codec);
  tracer.registerExtractor(FORMAT_HTTP_HEADERS, codec);

  initGlobalTracer(tracer);

  return tracer;
}
initTracer();

const jaegerTracerFactory: ObjectFactory = () => {
  return globalTracer();
}

export default jaegerTracerFactory;
