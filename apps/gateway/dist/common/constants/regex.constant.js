"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TITLE_REGEX = exports.ADDRESS_REGEX = exports.BCRYPT_HASH = exports.SLUG_REGEX = exports.NAME_REGEX = exports.PASSWORD_REGEX = void 0;
exports.PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
exports.NAME_REGEX = /(^[\p{L}\d'\.\s-]*$)/u;
exports.SLUG_REGEX = /^[a-z\d]+(?:(\.|-)[a-z\d]+)*$/;
exports.BCRYPT_HASH = /\$2[abxy]?\$\d{1,2}\$[A-Za-z\d\./]{53}/;
exports.ADDRESS_REGEX = /(^[\p{L}\d'\.\s\-_º]*$)/u;
exports.TITLE_REGEX = /(^[\p{L}\d'\.\s\-!?]*$)/u;
//# sourceMappingURL=regex.constant.js.map