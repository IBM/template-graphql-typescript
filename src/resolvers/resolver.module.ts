import { Module } from '@nestjs/common';

import {providers} from './providers'
import {ServiceModule} from "../services";

@Module({
    imports: [ServiceModule],
    providers,
})
export class ResolverModule {}
