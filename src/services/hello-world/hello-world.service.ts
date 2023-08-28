import { Injectable } from '@nestjs/common';
import {HelloWorldApi} from "./hello-world.api";
import {GreetingModel} from "../../models";

@Injectable()
export class HelloWorldService implements HelloWorldApi {
  getHello(): GreetingModel {
    return {greeting: 'Hello World!'};
  }
}
