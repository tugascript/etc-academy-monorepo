"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestStatusEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var RequestStatusEnum;
(function (RequestStatusEnum) {
    RequestStatusEnum["PENDING"] = "PENDING";
    RequestStatusEnum["ACCEPTED"] = "ACCEPTED";
    RequestStatusEnum["REJECTED"] = "REJECTED";
})(RequestStatusEnum = exports.RequestStatusEnum || (exports.RequestStatusEnum = {}));
(0, graphql_1.registerEnumType)(RequestStatusEnum, {
    name: 'RequestStatus',
});
//# sourceMappingURL=request-status.enum.js.map