import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IExtendedRequest } from '../interfaces/extended-request.interface';
import { MercuriusContext } from 'mercurius';
import { IAccessUser } from 'app/common/interfaces';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): IAccessUser | undefined => {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest()?.user;
    }

    const gqlCtx: MercuriusContext =
      GqlExecutionContext.create(context).getContext();
    return (gqlCtx.reply.request as IExtendedRequest).user;
  },
);
