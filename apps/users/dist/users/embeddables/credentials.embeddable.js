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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsEmbeddable = void 0;
const core_1 = require("@mikro-orm/core");
const dayjs_1 = __importDefault(require("dayjs"));
let CredentialsEmbeddable = class CredentialsEmbeddable {
    constructor(input) {
        this.version = 0;
        this.lastPassword = '';
        this.updatedAt = (0, dayjs_1.default)().unix();
        if (input) {
            const { version, lastPassword, updatedAt } = input;
            this.version = version !== null && version !== void 0 ? version : this.version;
            this.lastPassword = lastPassword !== null && lastPassword !== void 0 ? lastPassword : this.lastPassword;
            this.updatedAt = updatedAt !== null && updatedAt !== void 0 ? updatedAt : this.updatedAt;
        }
    }
    updatePassword(password) {
        this.version++;
        this.lastPassword = password;
        this.updatedAt = (0, dayjs_1.default)().unix();
    }
    updateVersion() {
        this.version++;
        this.updatedAt = (0, dayjs_1.default)().unix();
    }
};
__decorate([
    (0, core_1.Property)({ default: 0 }),
    __metadata("design:type", Number)
], CredentialsEmbeddable.prototype, "version", void 0);
__decorate([
    (0, core_1.Property)({ default: '' }),
    __metadata("design:type", String)
], CredentialsEmbeddable.prototype, "lastPassword", void 0);
__decorate([
    (0, core_1.Property)({ default: (0, dayjs_1.default)().unix() }),
    __metadata("design:type", Number)
], CredentialsEmbeddable.prototype, "updatedAt", void 0);
CredentialsEmbeddable = __decorate([
    (0, core_1.Embeddable)(),
    __metadata("design:paramtypes", [Object])
], CredentialsEmbeddable);
exports.CredentialsEmbeddable = CredentialsEmbeddable;
//# sourceMappingURL=credentials.embeddable.js.map