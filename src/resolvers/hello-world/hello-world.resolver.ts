import {NotFoundException} from "@nestjs/common";
import {Query, Resolver} from "@nestjs/graphql";

import {Greeting, GreetingModel} from "../../models";
import {HelloWorldApi} from "../../services";

@Resolver(of => Greeting)
export class HelloWorldResolver {
    constructor(private readonly service: HelloWorldApi) {}

    @Query(returns => Greeting)
    async helloWorld(): Promise<GreetingModel> {
        const greeting = await this.service.getHello();
        if (!greeting) {
            throw new NotFoundException();
        }
        return greeting;
    }
}
