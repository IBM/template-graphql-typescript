import {Container} from 'typescript-ioc';
import {NonEmptyArray} from 'type-graphql/dist/interfaces/NonEmptyArray';

export abstract class ResolverManager {
  abstract registerResolver(resolver): any;
  abstract getResolvers(): NonEmptyArray<Function> | NonEmptyArray<string>;
}

class ResolverManagerImpl implements ResolverManager {
  private resolvers: Array<Function> | Array<string> = [];

  getResolvers(): NonEmptyArray<Function> | NonEmptyArray<string> {
    return this.resolvers.splice(0) as any;
  }

  registerResolver(resolver): any {
    this.resolvers.push(resolver);
  }
}

export const resolverManager: ResolverManager = Container.get(ResolverManagerImpl);
