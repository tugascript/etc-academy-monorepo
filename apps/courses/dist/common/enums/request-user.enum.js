"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestUserEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var RequestUserEnum;
(function (RequestUserEnum) {
    RequestUserEnum["SENDER"] = "SENDER";
    RequestUserEnum["RECIPIENT"] = "RECIPIENT";
})(RequestUserEnum = exports.RequestUserEnum || (exports.RequestUserEnum = {}));
(0, graphql_1.registerEnumType)(RequestUserEnum, {
    name: 'RequestUser',
});
//# sourceMappingURL=request-user.enum.js.map