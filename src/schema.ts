import {buildSchema} from 'type-graphql';
import {resolverManager} from './resolvers';

export async function buildGraphqlSchema() {
  const schema = await buildSchema({
    resolvers: resolverManager.getResolvers(),
    emitSchemaFile: true,
  });

  return schema;
}
