import { FastifyRequest } from 'fastify';
import { IAccessUser } from './access-user.interface';

export interface IExtendedRequest extends FastifyRequest {
  user?: IAccessUser;
}
