import { Container } from "typescript-ioc";

export * from './hello-world.api';
export * from './project.api';
export * from './task.api';

import config from './ioc.config';

Container.configure(...config);
