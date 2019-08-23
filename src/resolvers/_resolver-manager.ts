import {Container} from 'typescript-ioc';

export abstract class ResolverManager {
  abstract registerResolver(resolver): any;
  abstract getResolvers(): any[];
}

class ResolverManagerImpl implements ResolverManager {
  private resolvers = [];

  getResolvers(): any[] {
    return this.resolvers.splice(0);
  }

  registerResolver(resolver): any {
    this.resolvers.push(resolver);
  }
}

export const resolverManager: ResolverManager = Container.get(ResolverManagerImpl);
