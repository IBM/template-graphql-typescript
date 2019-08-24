import 'reflect-metadata';

import {workerManager} from './workers';
import {ApiServer} from './server';

export const start = async (): Promise<any> => {
  return new Promise<void>((resolve, reject) => {
    const apiServer = new ApiServer();

    Promise.all([
      apiServer.start(),
      workerManager.start(),
    ]).then(() => resolve())
      .catch(reject);


    const graceful = () => {
      Promise.all([
        apiServer.stop(),
        workerManager.stop(),
      ]).then(() => process.exit(0));
    };

    // Stop graceful
    process.on('SIGTERM', graceful);
    process.on('SIGINT', graceful);
  });
};
