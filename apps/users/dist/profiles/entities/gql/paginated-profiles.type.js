"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedProfilesType = void 0;
const gql_1 = require("../../../common/entities/gql");
const graphql_1 = require("@nestjs/graphql");
const profile_entity_1 = require("../profile.entity");
let PaginatedProfilesType = class PaginatedProfilesType extends (0, gql_1.Paginated)(profile_entity_1.ProfileEntity) {
};
PaginatedProfilesType = __decorate([
    (0, graphql_1.ObjectType)('PaginatedProfiles')
], PaginatedProfilesType);
exports.PaginatedProfilesType = PaginatedProfilesType;
//# sourceMappingURL=paginated-profiles.type.js.map