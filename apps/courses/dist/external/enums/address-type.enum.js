"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressTypeEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var AddressTypeEnum;
(function (AddressTypeEnum) {
    AddressTypeEnum["LOCATION"] = "LOCATION";
    AddressTypeEnum["BILLING"] = "BILLING";
})(AddressTypeEnum = exports.AddressTypeEnum || (exports.AddressTypeEnum = {}));
(0, graphql_1.registerEnumType)(AddressTypeEnum, {
    name: 'AddressType',
});
//# sourceMappingURL=address-type.enum.js.map