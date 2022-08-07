"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileStatusEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var ProfileStatusEnum;
(function (ProfileStatusEnum) {
    ProfileStatusEnum["STAFF"] = "STAFF";
    ProfileStatusEnum["ENROLLED"] = "ENROLLED";
    ProfileStatusEnum["STUDYING"] = "STUDYING";
    ProfileStatusEnum["GRADUATED"] = "GRADUATED";
})(ProfileStatusEnum = exports.ProfileStatusEnum || (exports.ProfileStatusEnum = {}));
(0, graphql_1.registerEnumType)(ProfileStatusEnum, {
    name: 'ProfileStatus',
});
//# sourceMappingURL=profile-status.enum.js.map