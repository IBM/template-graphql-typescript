import {Field, ObjectType} from "@nestjs/graphql";

export interface GreetingModel {
    greeting: string
}

@ObjectType({ description: 'greeting' })
export class Greeting implements GreetingModel {
    @Field()
    greeting: string;
}
