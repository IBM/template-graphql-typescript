import {Module} from "@nestjs/common";

import {providers} from "./providers";

@Module({
    providers,
    exports: providers
})
export class ServiceModule {}
