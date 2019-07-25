import { Field, Int, ObjectType } from "type-graphql";
import {Project} from "./project.schema";

@ObjectType()
export class Task {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field(type => Project)
  project: Project;

  @Field()
  completed: boolean;
}
