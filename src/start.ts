import { GraphQLServer } from "graphql-yoga";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import {workerManager} from './workers';
import {resolverManager} from './resolvers';
import {AddressInfo} from 'net';

export const start = async (): Promise<any> => {
  const schema = await buildSchema({
    resolvers: resolverManager.getResolvers(),
    emitSchemaFile: true,
  });

  const graphqlServer = new GraphQLServer({
    schema,
  });

  const graceful = () => {
    workerManager.stop().then(() => process.exit(0));
  };

  // Stop graceful
  process.on('SIGTERM', graceful);
  process.on('SIGINT', graceful);

  return Promise.all([
    workerManager.start(),
    graphqlServer
      .start({port: process.env.port || 3000})
      .then(server => {
        const serverUrl = addressInfoToString(server.address());

        console.log(`Listening on ${serverUrl}`);
      }),
  ]);
};

function addressInfoToString(addressInfo: AddressInfo | string): string {
  if (typeof addressInfo === 'string') {
    return addressInfo;
  }

  const address = addressInfo.address === '::' ? 'localhost' : addressInfo.address;

  return `http://${address}:${addressInfo.port}`;
}
