import {ContainerConfiguration, ObjectFactory, Scope} from 'typescript-ioc';
import {TracerApi} from './tracer.api';

const isJaegerConfigured: () => boolean = () => {
  return !!process.env.JAEGER_AGENT_HOST || !!process.env.JAEGER_ENDPOINT;
}
const factory: ObjectFactory = isJaegerConfigured()
  ? require('./jaeger-tracer').default
  : require('./logger-tracer').default;

const config: ContainerConfiguration[] = [
  {
    bind: TracerApi,
    factory,
    scope: Scope.Singleton
  }
];

export default config;