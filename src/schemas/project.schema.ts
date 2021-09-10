import {Field, Int, ObjectType} from 'type-graphql';

import {Task} from './task.schema';

@ObjectType()
export class Project {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field(type => [Task])
  tasks: Task[];
}
