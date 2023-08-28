import {Provider} from "@nestjs/common";
import {HelloWorldResolver} from "./hello-world";

export * from './hello-world'

export const providers: Provider[] = [HelloWorldResolver]
