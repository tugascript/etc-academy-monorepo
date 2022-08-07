"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonTypeEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var LessonTypeEnum;
(function (LessonTypeEnum) {
    LessonTypeEnum["IN_PERSON"] = "IN_PERSON";
    LessonTypeEnum["ONLINE"] = "ONLINE";
})(LessonTypeEnum = exports.LessonTypeEnum || (exports.LessonTypeEnum = {}));
(0, graphql_1.registerEnumType)(LessonTypeEnum, {
    name: 'LessonType',
});
//# sourceMappingURL=lesson-type.enum.js.map