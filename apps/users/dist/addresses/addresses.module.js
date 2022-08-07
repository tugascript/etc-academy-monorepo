"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressesModule = void 0;
const nestjs_1 = require("@mikro-orm/nestjs");
const common_1 = require("@nestjs/common");
const profiles_module_1 = require("../profiles/profiles.module");
const addresses_resolver_1 = require("./addresses.resolver");
const addresses_service_1 = require("./addresses.service");
const address_entity_1 = require("./entities/address.entity");
let AddressesModule = class AddressesModule {
};
AddressesModule = __decorate([
    (0, common_1.Module)({
        imports: [nestjs_1.MikroOrmModule.forFeature([address_entity_1.AddressEntity]), profiles_module_1.ProfilesModule],
        providers: [addresses_resolver_1.AddressesResolver, addresses_service_1.AddressesService],
        exports: [addresses_service_1.AddressesService],
    })
], AddressesModule);
exports.AddressesModule = AddressesModule;
//# sourceMappingURL=addresses.module.js.map