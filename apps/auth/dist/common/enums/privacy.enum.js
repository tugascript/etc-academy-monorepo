"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivacyEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var PrivacyEnum;
(function (PrivacyEnum) {
    PrivacyEnum["PRIVATE"] = "PRIVATE";
    PrivacyEnum["PUBLIC"] = "PUBLIC";
    PrivacyEnum["PRODUCT"] = "PRODUCT";
    PrivacyEnum["FOLLOWERS"] = "FOLLOWERS";
})(PrivacyEnum = exports.PrivacyEnum || (exports.PrivacyEnum = {}));
(0, graphql_1.registerEnumType)(PrivacyEnum, {
    name: 'Privacy',
});
//# sourceMappingURL=privacy.enum.js.map