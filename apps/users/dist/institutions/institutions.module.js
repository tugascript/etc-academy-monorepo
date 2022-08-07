"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionsModule = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const addresses_module_1 = require("../addresses/addresses.module");
const profiles_module_1 = require("../profiles/profiles.module");
const institution_entity_1 = require("./entities/institution.entity");
const institutions_resolver_1 = require("./institutions.resolver");
const institutions_service_1 = require("./institutions.service");
let InstitutionsModule = class InstitutionsModule {
};
InstitutionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_1.MikroOrmModule.forFeature([institution_entity_1.InstitutionEntity]),
            profiles_module_1.ProfilesModule,
            addresses_module_1.AddressesModule,
        ],
        providers: [institutions_resolver_1.InstitutionsResolver, institutions_service_1.InstitutionsService],
        exports: [institutions_service_1.InstitutionsService],
    })
], InstitutionsModule);
exports.InstitutionsModule = InstitutionsModule;
//# sourceMappingURL=institutions.module.js.map