import {GraphQLServer} from 'graphql-yoga';
import {AddressInfo} from 'net';
import 'reflect-metadata';

import {workerManager} from './workers';
import {buildGraphqlSchema} from './schema';

export const start = async (): Promise<any> => {
  const graphqlServer = new GraphQLServer({
    schema: await buildGraphqlSchema(),
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
