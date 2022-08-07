"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.CurrentUser = (0, common_1.createParamDecorator)((_, context) => {
    var _a;
    if (context.getType() === 'http') {
        return (_a = context.switchToHttp().getRequest()) === null || _a === void 0 ? void 0 : _a.user;
    }
    const gqlCtx = graphql_1.GqlExecutionContext.create(context).getContext();
    return gqlCtx.reply.request.user;
});
//# sourceMappingURL=current-user.decorator.js.map