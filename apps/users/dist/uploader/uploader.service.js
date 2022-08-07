"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploaderService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
const constants_1 = require("./constants");
let UploaderService = class UploaderService {
    constructor(options) {
        const { name, region, credentials, uuid, folder, url } = options;
        this.bucketNamespace = uuid;
        this.baseFolder = folder;
        this.bucketData = { name, url };
        this.client = new client_s3_1.S3Client({
            region,
            credentials,
            forcePathStyle: false,
            endpoint: url,
        });
    }
    async uploadImage(userId, file, ratio) {
        const { mimetype, createReadStream } = await file;
        const imageType = this.validateImage(mimetype);
        if (!imageType)
            throw new common_1.BadRequestException('Please upload a valid image');
        let buffer = await this.throwInternalError(this.streamToBuffer(createReadStream()));
        buffer = await this.compressImage(buffer, ratio);
        return await this.uploadFile(userId, buffer, '.jpg');
    }
    async uploadDocument(userId, file) {
        const { mimetype, createReadStream } = await file;
        const documentType = constants_1.DOCUMENT_TYPES[mimetype];
        if (!documentType)
            throw new common_1.BadRequestException('Invalid document.');
        const buffer = await this.throwInternalError(this.streamToBuffer(createReadStream()));
        return await this.uploadFile(userId, buffer, documentType.extension);
    }
    async deleteFile(url) {
        if (!this.validateBucketUrl(url))
            throw new common_1.BadRequestException('Url not valid');
        const keyArr = url.split('.com/');
        try {
            await this.client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: this.bucketData.name,
                Key: keyArr[1],
            }));
        }
        catch (_) { }
    }
    validateImage(mimetype) {
        var _a;
        const val = mimetype.split('/');
        if (val[0] !== 'image')
            return false;
        return (_a = val[1]) !== null && _a !== void 0 ? _a : false;
    }
    validateBucketUrl(url) {
        return url.includes(this.bucketData.url.substring(8));
    }
    async compressImage(buffer, ratio) {
        let compressBuffer = (0, sharp_1.default)(buffer).jpeg({
            mozjpeg: true,
            chromaSubsampling: '4:4:4',
        });
        if (ratio)
            compressBuffer.resize({
                width: constants_1.MAX_WIDTH,
                height: Math.round(constants_1.MAX_WIDTH * ratio),
                fit: 'cover',
            });
        compressBuffer = await compressBuffer.toBuffer();
        if (compressBuffer.length > 256000) {
            for (let i = 0; i < constants_1.QUALITY_ARRAY.length; i++) {
                const quality = constants_1.QUALITY_ARRAY[i];
                const smallerBuffer = await (0, sharp_1.default)(compressBuffer)
                    .jpeg({
                    quality,
                    chromaSubsampling: '4:4:4',
                })
                    .toBuffer();
                if (smallerBuffer.length <= 256000 || quality === 10) {
                    compressBuffer = smallerBuffer;
                    break;
                }
            }
        }
        return compressBuffer;
    }
    async streamToBuffer(stream) {
        const buffer = [];
        return new Promise((resolve, reject) => stream
            .on('error', (error) => reject(error))
            .on('data', (data) => buffer.push(data))
            .on('end', () => resolve(Buffer.concat(buffer))));
    }
    async uploadFile(userId, fileBuffer, fileExt) {
        const folderId = (0, uuid_1.v5)(userId.toString(), this.bucketNamespace);
        const key = `${this.baseFolder}/${folderId}/${(0, uuid_1.v4)()}.${fileExt}`;
        await this.throwInternalError(this.client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.bucketData.name,
            Body: fileBuffer,
            Key: key,
            ACL: 'public-read',
        })));
        return this.bucketData.url + '/' + key;
    }
    async throwInternalError(promise) {
        try {
            return await promise;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
};
UploaderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.BUCKET_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], UploaderService);
exports.UploaderService = UploaderService;
//# sourceMappingURL=uploader.service.js.map