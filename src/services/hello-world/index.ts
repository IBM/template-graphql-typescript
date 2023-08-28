import {Provider} from "@nestjs/common";

import { HelloWorldApi } from './hello-world.api';
import { HelloWorldService } from './hello-world.service';

export * from './hello-world.api';

export const provider: Provider = {
  provide: HelloWorldApi,
  useClass: HelloWorldService,
};
