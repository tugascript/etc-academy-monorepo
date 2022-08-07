import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators';
import { IExtendedRequest } from './interfaces';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CommonService } from './common.service';
import { MercuriusContext } from 'mercurius';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly commonService: CommonService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (context.getType() === 'http') {
      return await this.setHttpHeader(
        context.switchToHttp().getRequest(),
        isPublic,
      );
    }

    const gqlCtx: MercuriusContext =
      GqlExecutionContext.create(context).getContext();
    return await this.setHttpHeader(gqlCtx.reply.request, isPublic);
  }

  private async setHttpHeader(
    req: IExtendedRequest,
    isPublic: boolean,
  ): Promise<boolean> {
    const auth = req.headers?.authorization;

    if (!auth) return isPublic;

    const arr = auth.split(' ');

    if (arr[0] !== 'Bearer') return isPublic;

    try {
      req.user = await this.commonService.verifyAccessToken(arr[1]);
      return true;
    } catch (_) {
      return isPublic;
    }
  }
}
