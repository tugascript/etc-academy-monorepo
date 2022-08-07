"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const decorators_1 = require("./decorators");
const graphql_1 = require("@nestjs/graphql");
const common_service_1 = require("./common.service");
let AuthGuard = class AuthGuard {
    constructor(reflector, commonService) {
        this.reflector = reflector;
        this.commonService = commonService;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(decorators_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (context.getType() === 'http') {
            return await this.setHttpHeader(context.switchToHttp().getRequest(), isPublic);
        }
        const gqlCtx = graphql_1.GqlExecutionContext.create(context).getContext();
        return await this.setHttpHeader(gqlCtx.reply.request, isPublic);
    }
    async setHttpHeader(req, isPublic) {
        var _a;
        const auth = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!auth)
            return isPublic;
        const arr = auth.split(' ');
        if (arr[0] !== 'Bearer')
            return isPublic;
        try {
            req.user = await this.commonService.verifyAccessToken(arr[1]);
            return true;
        }
        catch (_) {
            return isPublic;
        }
    }
};
AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        common_service_1.CommonService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map