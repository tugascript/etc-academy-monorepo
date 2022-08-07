"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionTypeEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var InstitutionTypeEnum;
(function (InstitutionTypeEnum) {
    InstitutionTypeEnum["PERSONAL"] = "PERSONAL";
    InstitutionTypeEnum["SCHOOL"] = "SCHOOL";
    InstitutionTypeEnum["TUTOR"] = "TUTOR";
    InstitutionTypeEnum["UNIVERSITY"] = "UNIVERSITY";
    InstitutionTypeEnum["COLLEGE"] = "COLLEGE";
    InstitutionTypeEnum["OTHER"] = "OTHER";
})(InstitutionTypeEnum = exports.InstitutionTypeEnum || (exports.InstitutionTypeEnum = {}));
(0, graphql_1.registerEnumType)(InstitutionTypeEnum, {
    name: 'InstitutionType',
});
//# sourceMappingURL=institution-type.enum.js.map