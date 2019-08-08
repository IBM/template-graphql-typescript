import {GraphQLServer} from 'graphql-yoga';
import {AddressInfo} from 'net';
import 'reflect-metadata';
import * as express from "express"
import {Server} from 'typescript-rest';

import {workerManager} from './workers';
import {buildGraphqlSchema} from './schema';
import {HealthController} from "./controllers/health.controller";

export const start = async (): Promise<any> => {

  const graphqlServer = new GraphQLServer({
    schema: await buildGraphqlSchema(),
  });

  const graceful = () => {
    workerManager.stop().then(() => process.exit(0));
  };

  const apiRouter: express.Router = express.Router();

  Server.useIoC(true);
  Server.loadControllers(
      apiRouter,
      [
        'controllers/*',
      ],
      __dirname,
  );

  graphqlServer.express.use(apiRouter);

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
