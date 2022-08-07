"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOppositeOrder = exports.getQueryOrder = exports.QueryOrderEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var QueryOrderEnum;
(function (QueryOrderEnum) {
    QueryOrderEnum["ASC"] = "ASC";
    QueryOrderEnum["DESC"] = "DESC";
})(QueryOrderEnum = exports.QueryOrderEnum || (exports.QueryOrderEnum = {}));
const getQueryOrder = (order) => order === QueryOrderEnum.ASC ? '$gt' : '$lt';
exports.getQueryOrder = getQueryOrder;
const getOppositeOrder = (order) => order === QueryOrderEnum.ASC ? '$lte' : '$gte';
exports.getOppositeOrder = getOppositeOrder;
(0, graphql_1.registerEnumType)(QueryOrderEnum, {
    name: 'QueryOrder',
});
//# sourceMappingURL=query-order.enum.js.map