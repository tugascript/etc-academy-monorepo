import { FastifyInstance } from 'fastify';
import { MercuriusDriverPlugin } from '../interfaces/mercurius-driver-plugin.interface';
export declare function registerMercuriusPlugins(app: FastifyInstance, plugins?: MercuriusDriverPlugin[]): Promise<void>;
