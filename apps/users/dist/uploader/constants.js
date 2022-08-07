"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOCUMENT_TYPES = exports.QUALITY_ARRAY = exports.MAX_WIDTH = exports.BUCKET_OPTIONS = void 0;
const enums_1 = require("./enums");
exports.BUCKET_OPTIONS = 'BUCKET_OPTIONS';
exports.MAX_WIDTH = 2160;
exports.QUALITY_ARRAY = [
    90, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10,
];
exports.DOCUMENT_TYPES = {
    'application/pdf': {
        fileType: enums_1.DocumentTypeEnum.PDF,
        extension: '.pdf',
    },
    'application/msword': {
        fileType: enums_1.DocumentTypeEnum.DOCUMENT,
        extension: '.doc',
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
        fileType: enums_1.DocumentTypeEnum.DOCUMENT,
        extension: '.docx',
    },
    'application/vnd.oasis.opendocument.text': {
        fileType: enums_1.DocumentTypeEnum.DOCUMENT,
        extension: '.odt',
    },
    'application/vnd.ms-powerpoint': {
        fileType: enums_1.DocumentTypeEnum.PRESENTATION,
        extension: '.ppt',
    },
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': {
        fileType: enums_1.DocumentTypeEnum.PRESENTATION,
        extension: '.pptx',
    },
    'application/vnd.oasis.opendocument.presentation': {
        fileType: enums_1.DocumentTypeEnum.PRESENTATION,
        extension: '.odp',
    },
    'application/vnd.ms-excel': {
        fileType: enums_1.DocumentTypeEnum.CALC_SHEET,
        extension: '.xls',
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        fileType: enums_1.DocumentTypeEnum.CALC_SHEET,
        extension: '.xlsx',
    },
    'application/vnd.oasis.opendocument.spreadsheet': {
        fileType: enums_1.DocumentTypeEnum.CALC_SHEET,
        extension: '.ods',
    },
};
//# sourceMappingURL=constants.js.map