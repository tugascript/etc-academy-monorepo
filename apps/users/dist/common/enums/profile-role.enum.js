"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoleEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var ProfileRoleEnum;
(function (ProfileRoleEnum) {
    ProfileRoleEnum["ADMIN"] = "ADMIN";
    ProfileRoleEnum["STAFF"] = "STAFF";
    ProfileRoleEnum["TEACHER"] = "TEACHER";
    ProfileRoleEnum["STUDENT"] = "STUDENT";
})(ProfileRoleEnum = exports.ProfileRoleEnum || (exports.ProfileRoleEnum = {}));
(0, graphql_1.registerEnumType)(ProfileRoleEnum, {
    name: 'ProfileRole',
});
//# sourceMappingURL=profile-role.enum.js.map