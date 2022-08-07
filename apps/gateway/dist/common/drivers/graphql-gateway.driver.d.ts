import { MercuriusGatewayDriver } from '@nestjs/mercurius';
import { MercuriusExtendedDriverConfig } from '../interfaces/mercurius-extended-driver-config.interface';
export declare class GraphQLGatewayDriver extends MercuriusGatewayDriver {
    constructor();
    start(options: MercuriusExtendedDriverConfig): Promise<void>;
}
