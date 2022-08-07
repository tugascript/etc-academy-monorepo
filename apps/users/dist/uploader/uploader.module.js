"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UploaderModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploaderModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const uploader_service_1 = require("./uploader.service");
let UploaderModule = UploaderModule_1 = class UploaderModule {
    static forRoot(options) {
        return {
            module: UploaderModule_1,
            providers: [
                {
                    provide: constants_1.BUCKET_OPTIONS,
                    useValue: options,
                },
            ],
        };
    }
    static forRootAsync(options) {
        return {
            module: UploaderModule_1,
            imports: options.imports,
            providers: this.createAsyncProviders(options),
        };
    }
    static createAsyncProviders(options) {
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: constants_1.BUCKET_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: constants_1.BUCKET_OPTIONS,
            useFactory: async (optionsFactory) => await optionsFactory.createBucketOptions(),
            inject: [options.useClass],
        };
    }
};
UploaderModule = UploaderModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [uploader_service_1.UploaderService],
        exports: [uploader_service_1.UploaderService],
    })
], UploaderModule);
exports.UploaderModule = UploaderModule;
//# sourceMappingURL=uploader.module.js.map