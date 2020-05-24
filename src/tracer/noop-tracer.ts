import {ObjectFactory} from 'typescript-ioc';
import {Tracer, initGlobalTracer, globalTracer} from 'opentracing';

function initTracer() {
  const tracer: Tracer = new Tracer();

  initGlobalTracer(tracer);
}
initTracer();

const noopTracerFactory: ObjectFactory = () => {
  return globalTracer();
}

export default noopTracerFactory;
