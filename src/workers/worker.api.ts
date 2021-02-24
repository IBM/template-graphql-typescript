
// tslint:disable:no-any
export abstract class WorkerApi {
  abstract start(): Promise<any>;
  abstract stop(): Promise<any>;
}
