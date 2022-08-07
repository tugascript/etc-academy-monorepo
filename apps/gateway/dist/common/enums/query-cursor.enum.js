"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserQueryCursor = exports.getQueryCursor = exports.QueryCursorEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var QueryCursorEnum;
(function (QueryCursorEnum) {
    QueryCursorEnum["DATE"] = "DATE";
    QueryCursorEnum["ALPHA"] = "ALPHA";
})(QueryCursorEnum = exports.QueryCursorEnum || (exports.QueryCursorEnum = {}));
(0, graphql_1.registerEnumType)(QueryCursorEnum, {
    name: 'QueryCursor',
});
const getQueryCursor = (cursor) => cursor === QueryCursorEnum.ALPHA ? 'id' : 'slug';
exports.getQueryCursor = getQueryCursor;
const getUserQueryCursor = (cursor) => cursor === QueryCursorEnum.ALPHA ? 'id' : 'username';
exports.getUserQueryCursor = getUserQueryCursor;
//# sourceMappingURL=query-cursor.enum.js.map