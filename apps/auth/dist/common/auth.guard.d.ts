import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CommonService } from './common.service';
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private readonly commonService;
    constructor(reflector: Reflector, commonService: CommonService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private setHttpHeader;
}
