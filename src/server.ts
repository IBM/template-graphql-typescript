import {Server} from 'typescript-rest';
import {Config, Container, Inject} from 'typescript-ioc';
import {join} from "path";
import {existsSync} from 'fs';
import express = require('express');
import {AddressInfo} from 'net';
import {GraphQLServer} from 'graphql-yoga';
import http = require('http');
import 'reflect-metadata';

import {buildGraphqlSchema} from './schema';
import {workerManager} from './workers';
import {LoggerApi} from './logger';

const npmPackage = require(join(process.cwd(), 'package.json'));

const config = npmPackage.config || {port: 3000};

export class ApiServer {
  @Inject
  logger: LoggerApi;

  private graphQLServerPromise: Promise<GraphQLServer>;
  private server: http.Server;
  public PORT: number = +process.env.PORT || config.port;

  private async getGraphQLServer(): Promise<GraphQLServer> {
    if (this.graphQLServerPromise) {
      return this.graphQLServerPromise;
    }

    return this.graphQLServerPromise = new Promise(async (resolve, reject) => {
      const graphqlServer = new GraphQLServer({
        schema: (await buildGraphqlSchema() as any),
      });

      const apiRouter: express.Router = express.Router();

      Server.loadControllers(
        apiRouter,
        [
          'controllers/*',
        ],
        __dirname,
      );

      this.logger.apply(graphqlServer.express);
      graphqlServer.express.use(apiRouter);

      const swaggerPath = join(process.cwd(), 'dist/swagger.json');
      if (existsSync(swaggerPath)) {
        Server.swagger(
          apiRouter,
          {
            filePath: swaggerPath,
            schemes: this.swaggerProtocols,
            host: this.swaggerHost,
            endpoint: '/api-docs'
          },
        );
      }

      resolve(graphqlServer);
    });
  }

  public async getApp(): Promise<express.Application> {
    const graphQLServer = await this.getGraphQLServer();

    return graphQLServer.express;
  }

  get swaggerProtocols(): string[] {
    return parseCSVString(process.env.PROTOCOLS, '');
  }

  get swaggerHost(): string {
    return process.env.INGRESS_HOST || '';
  }

  public bind(source: Function): Config {
    return Container.bind(source);
  }

  public get<T>(source: Function): T {
    return Container.get(source);
  }

  public async start(): Promise<ApiServer> {
    const graphQLServer = await this.getGraphQLServer();

    this.server = await graphQLServer.start({port: this.PORT});

    const serverUrl = addressInfoToString(this.server.address());

    console.log(`Listening on ${serverUrl}`);

    return this;
  }

  /**
   * Stop the server (if running).
   * @returns {Promise<boolean>}
   */
  public async stop(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      if (this.server) {
        this.server.close(() => {
          return resolve(true);
        });
      } else {
        return resolve(true);
      }
    });
  }
}

function addressInfoToString(addressInfo: AddressInfo | string): string {
  if (typeof addressInfo === 'string') {
    return addressInfo;
  }

  const address = addressInfo.address === '::' ? 'localhost' : addressInfo.address;

  return `http://${address}:${addressInfo.port}`;
}

function parseCSVString(value: string, defaultValue?: string): string[] {
  if (value) {
    return (value.split(',') || []).map(v => v.trim());
  }

  return defaultValue ? [defaultValue] : [];
}
