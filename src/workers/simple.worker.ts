import Timeout = NodeJS.Timeout;
import {WorkerApi} from './worker.api';
import {workerManager} from './worker-manager';
import {Container, Inject} from 'typescript-ioc';
import {LoggerApi} from '../logger';

class SimpleWorker implements WorkerApi {
  @Inject
  _logger: LoggerApi;

  private promise: Promise<any>;
  private stopped = false;
  private interval: Timeout;

  get logger(): LoggerApi {
    return this._logger.child('SimpleWorker');
  }

  async stop(): Promise<any> {
    this.stopped = true;
    this.logger.info('*** Stopping simple worker');

    if (this.interval) {
      clearInterval(this.interval);
    }

    return Promise.resolve('stopped');
  }

  async start(): Promise<any> {
    if (this.promise) {
      return this.promise;
    }

    this.writeLog();

    return this.promise = new Promise<any>((resolve, reject) => {
      this.interval = setInterval(() => {
        if (this.stopped) {
          clearInterval(this.interval);
          resolve('stopped');
        }

        this.writeLog();
      }, 60 * 1000);
    });
  }

  writeLog() {
    this.logger.info('**** Simple worker running');
  }
}

// Uncomment to activate worker
//export const worker: WorkerApi = workerManager.registerWorker(Container.get(SimpleWorker));
