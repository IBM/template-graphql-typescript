import {buildSchema} from 'type-graphql';
import {GraphQLSchema} from 'graphql';
import {join} from 'path';

import {resolverManager} from './resolvers';
import {timer} from './util';

export async function buildGraphqlSchema(): Promise<GraphQLSchema> {
  await timer('', 2);

  const resolvers = resolverManager.getResolvers();
  if (!resolvers || resolvers.length == 0) {
    return;
  }

  const schema: GraphQLSchema = await buildSchema({
    resolvers,
    emitSchemaFile: {path: join(process.cwd(), 'schema.gql')},
  });

  return schema;
}
