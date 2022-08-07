"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeTypeEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var ChangeTypeEnum;
(function (ChangeTypeEnum) {
    ChangeTypeEnum["NEW"] = "NEW";
    ChangeTypeEnum["UPDATE"] = "UPDATE";
    ChangeTypeEnum["DELETE"] = "DELETE";
})(ChangeTypeEnum = exports.ChangeTypeEnum || (exports.ChangeTypeEnum = {}));
(0, graphql_1.registerEnumType)(ChangeTypeEnum, {
    name: 'NotificationType',
});
//# sourceMappingURL=change-type.enum.js.map