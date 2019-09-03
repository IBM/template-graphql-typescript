import {buildSchema} from 'type-graphql';
import {resolverManager} from './resolvers';
import {GraphQLSchema} from 'graphql';
import {timer} from './util';

export async function buildGraphqlSchema(): Promise<GraphQLSchema | undefined> {
  await timer('', 2);

  const resolvers = resolverManager.getResolvers();
  if (!resolvers || resolvers.length == 0) {
    return;
  }

  const schema: GraphQLSchema = await buildSchema({
    resolvers,
    emitSchemaFile: true,
  });

  return schema;
}
