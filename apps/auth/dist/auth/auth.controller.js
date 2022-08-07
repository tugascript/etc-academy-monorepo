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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const decorators_1 = require("../common/decorators");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const confirm_email_dto_1 = require("./dtos/confirm-email.dto");
const confirm_login_dto_1 = require("./dtos/confirm-login.dto");
const login_dto_1 = require("./dtos/login.dto");
const register_dto_1 = require("./dtos/register.dto");
const reset_email_dto_1 = require("./dtos/reset-email.dto");
const reset_password_dto_1 = require("./dtos/reset-password.dto");
const update_password_dto_1 = require("./dtos/update-password.dto");
const fastify_throttler_guard_1 = require("./guards/fastify-throttler.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerUser(registerDto) {
        return this.authService.registerUser(registerDto);
    }
    async confirmEmail(res, confirmEmailDto) {
        const result = await this.authService.confirmEmail(res, confirmEmailDto);
        res.status(200).send(result);
    }
    async loginUser(res, loginDto) {
        const result = await this.authService.loginUser(res, loginDto);
        res.status(200).send(result);
    }
    async confirmLogin(res, confirmLoginDto) {
        const result = await this.authService.confirmLogin(res, confirmLoginDto);
        res.status(200).send(result);
    }
    logoutUser(res) {
        const message = this.authService.logoutUser(res);
        res.status(200).send(message);
    }
    async refreshAccessToken(req, res) {
        const result = await this.authService.refreshAccessToken(req, res);
        res.status(200).send(result);
    }
    async sendResetPasswordEmail(resetEmailDto) {
        return this.authService.sendResetPasswordEmail(resetEmailDto);
    }
    async resetPassword(resetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }
    async updatePassword(res, user, changePasswordDto) {
        const result = await this.authService.updatePassword(res, user.id, changePasswordDto);
        res.status(200).send(result);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/confirm-email'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, confirm_email_dto_1.ConfirmEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmEmail", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/confirm-login'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, confirm_login_dto_1.ConfirmLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmLogin", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logoutUser", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/refresh-access'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshAccessToken", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/reset-password-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_email_dto_1.ResetEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendResetPasswordEmail", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('/update-password'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, decorators_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
AuthController = __decorate([
    (0, common_1.Controller)('api/auth'),
    (0, common_1.UseGuards)(fastify_throttler_guard_1.FastifyThrottlerGuard),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map