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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const dtos_1 = require("../common/dtos");
const api_user_email_dto_1 = require("./dtos/api-user-email.dto");
const api_user_id_dto_1 = require("./dtos/api-user-id.dto");
const change_password_dto_1 = require("./dtos/change-password.dto");
const login_dto_1 = require("./dtos/login.dto");
const register_dto_1 = require("./dtos/register.dto");
const update_password_dto_1 = require("./dtos/update-password.dto");
const user_payload_dto_1 = require("./dtos/user-payload.dto");
const exception_filter_1 = require("./filters/exception.filter");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService, configService) {
        this.usersService = usersService;
        this.configService = configService;
        this.authUUID = this.configService.get('AUTH_UUID');
    }
    async createUser(dto) {
        this.checkApi(dto);
        const user = await this.usersService.createUser(dto);
        return this.transformUser(user);
    }
    async confirmUser(dto) {
        this.checkApi(dto);
        const user = await this.usersService.confirmUser(dto);
        return this.transformUser(user);
    }
    async loginUser(dto) {
        this.checkApi(dto);
        const user = await this.usersService.loginUser(dto);
        return this.transformUser(user);
    }
    async changePassword(dto) {
        this.checkApi(dto);
        const user = await this.usersService.changePassword(dto);
        return this.transformUser(user);
    }
    async updatePassword(dto) {
        this.checkApi(dto);
        const user = await this.usersService.updatePassword(dto);
        return this.transformUser(user);
    }
    async userById(dto) {
        this.checkApi(dto);
        const user = await this.usersService.userByIdForAuth(dto.userId);
        return this.transformUser(user);
    }
    async userByEmail(dto) {
        this.checkApi(dto);
        const user = await this.usersService.userByEmailForAuth(dto.email);
        return this.transformUser(user);
    }
    async userByPayload(dto) {
        this.checkApi(dto);
        const user = await this.usersService.userByPayload(dto.userId, dto.count);
        return this.transformUser(user);
    }
    checkApi(dto) {
        if (dto.apiId !== this.authUUID)
            throw new microservices_1.RpcException('Unauthorized');
    }
    transformUser(user) {
        const messageUser = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            picture: user.picture,
            count: user.credentials.version,
            twoFactor: user.twoFactor,
            lastOnline: user.lastOnline,
            lastLogin: user.lastLogin,
            confirmed: user.confirmed,
            suspended: user.suspended,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        return new dtos_1.RedisMessageDto(messageUser);
    }
};
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'CREATE_USER' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'CONFIRM_USER' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_payload_dto_1.UserPayloadDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "confirmUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'LOGIN_USER' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "loginUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'CHANGE_USER_PASSWORD' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'UPDATE_USER_PASSWORD' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'USER_BY_ID' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_user_id_dto_1.ApiUserIdDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "userById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'USER_BY_EMAIL' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_user_email_dto_1.ApiUserEmailDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "userByEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'USER_BY_PAYLOAD' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_payload_dto_1.UserPayloadDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "userByPayload", null);
UsersController = __decorate([
    (0, common_1.UseFilters)(new exception_filter_1.ExceptionFilter()),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        config_1.ConfigService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map