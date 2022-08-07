"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseTypeEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var CourseTypeEnum;
(function (CourseTypeEnum) {
    CourseTypeEnum["IN_PERSON"] = "IN_PERSON";
    CourseTypeEnum["ONLINE"] = "ONLINE";
    CourseTypeEnum["HYBRID"] = "HYBRID";
})(CourseTypeEnum = exports.CourseTypeEnum || (exports.CourseTypeEnum = {}));
(0, graphql_1.registerEnumType)(CourseTypeEnum, {
    name: 'CourseType',
});
//# sourceMappingURL=course-type.enum.js.map