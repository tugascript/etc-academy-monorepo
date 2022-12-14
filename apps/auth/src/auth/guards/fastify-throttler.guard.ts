import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';
import { MercuriusContext } from 'mercurius';

@Injectable()
export class FastifyThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    if (context.getType() === 'http') {
      const http = context.switchToHttp();

      return { req: http.getRequest(), res: http.getResponse() };
    }

    const gqlCtx: MercuriusContext =
      GqlExecutionContext.create(context).getContext();
    return { req: gqlCtx.reply.request, res: gqlCtx.reply };
  }
}
