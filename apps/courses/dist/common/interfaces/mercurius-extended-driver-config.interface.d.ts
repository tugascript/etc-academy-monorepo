import { GqlModuleOptions } from '@nestjs/graphql';
import { MercuriusOptions } from 'mercurius';
import { MercuriusDriverPlugin } from './mercurius-driver-plugin.interface';
interface MercuriusPlugins {
    plugins?: MercuriusDriverPlugin[];
}
export declare type MercuriusExtendedDriverConfig = GqlModuleOptions & MercuriusOptions & MercuriusPlugins;
export {};
