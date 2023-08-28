import {Provider} from "@nestjs/common";
import {provider as helloWorldProvider} from "./hello-world";

export * from './hello-world';

export const providers: Provider[] = [helloWorldProvider];
