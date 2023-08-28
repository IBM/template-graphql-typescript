import {GreetingModel} from "../../models";

export abstract class HelloWorldApi {
    abstract getHello(): GreetingModel
}
