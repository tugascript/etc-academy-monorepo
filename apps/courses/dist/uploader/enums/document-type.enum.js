"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentTypeEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var DocumentTypeEnum;
(function (DocumentTypeEnum) {
    DocumentTypeEnum["PDF"] = "PDF";
    DocumentTypeEnum["DOCUMENT"] = "DOCUMENT";
    DocumentTypeEnum["PRESENTATION"] = "PRESENTATION";
    DocumentTypeEnum["CALC_SHEET"] = "CALC_SHEET";
})(DocumentTypeEnum = exports.DocumentTypeEnum || (exports.DocumentTypeEnum = {}));
(0, graphql_1.registerEnumType)(DocumentTypeEnum, {
    name: 'DocumentType',
});
//# sourceMappingURL=document-type.enum.js.map