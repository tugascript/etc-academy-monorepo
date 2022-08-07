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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("../common");
const gql_1 = require("../common/entities/gql");
const utils_1 = require("../common/utils");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const bcrypt_1 = require("bcrypt");
const rxjs_1 = require("rxjs");
const uuid_1 = require("uuid");
const email_service_1 = require("../email/email.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(configService, emailService, commonService, usersClient, cacheManager) {
        this.configService = configService;
        this.emailService = emailService;
        this.commonService = commonService;
        this.usersClient = usersClient;
        this.cacheManager = cacheManager;
        this.cookieName = this.configService.get('REFRESH_COOKIE');
        this.url = this.configService.get('url');
        this.authNamespace = this.configService.get('AUTH_UUID');
        this.testing = this.configService.get('testing');
        this.refreshTime = this.configService.get('jwt.refresh.time');
    }
    static generateAccessCode() {
        const nums = '0123456789';
        let code = '';
        while (code.length < 6) {
            const i = Math.floor(Math.random() * nums.length);
            code += nums[i];
        }
        return code;
    }
    async registerUser(dto) {
        const user = await this.getUserMessage('CREATE_USER', dto);
        await this.sendConfirmationEmail(user);
        return new gql_1.LocalMessageType('User registered successfully');
    }
    async confirmEmail(res, { confirmationToken }) {
        const { id, count } = (await this.verifyAuthToken(confirmationToken, 'confirmation'));
        const user = await this.getUserMessage('CONFIRM_USER', { id, count });
        const [accessToken, refreshToken] = await this.generateAuthTokens(user);
        this.saveRefreshCookie(res, refreshToken);
        return { accessToken };
    }
    async loginUser(res, dto) {
        const user = await this.getUserMessage('LOGIN_USER', dto);
        if (!user.confirmed) {
            this.sendConfirmationEmail(user);
            throw new common_2.UnauthorizedException('Please confirm your account. A new email has been sent');
        }
        if (user.twoFactor) {
            const code = AuthService_1.generateAccessCode();
            await this.commonService.throwInternalError(this.cacheManager.set((0, uuid_1.v5)(user.email, this.authNamespace), await (0, bcrypt_1.hash)(code, 5)));
            this.emailService.sendAccessCode(user, code);
            return new gql_1.LocalMessageType('Login confirmation code sent');
        }
        const [accessToken, refreshToken] = await this.generateAuthTokens(user);
        this.saveRefreshCookie(res, refreshToken);
        return {
            accessToken,
        };
    }
    async confirmLogin(res, { email, accessCode }) {
        const hashedCode = await this.commonService.throwInternalError(this.cacheManager.get((0, uuid_1.v5)(email, this.authNamespace)));
        if (!hashedCode || !(await (0, bcrypt_1.compare)(accessCode, hashedCode)))
            throw new common_2.UnauthorizedException('Access code is invalid or has expired');
        const user = await this.getUserMessage('USER_BY_EMAIL', { email });
        const [accessToken, refreshToken] = await this.generateAuthTokens(user);
        this.saveRefreshCookie(res, refreshToken);
        return { accessToken };
    }
    logoutUser(res) {
        res.clearCookie(this.cookieName, { path: '/api/auth/refresh-access' });
        return new gql_1.LocalMessageType('Logout Successfully');
    }
    async refreshAccessToken(req, res) {
        const token = req.cookies[this.cookieName];
        if (!token)
            throw new common_2.UnauthorizedException('Invalid refresh token');
        const { valid, value } = res.unsignCookie(token);
        if (!valid)
            throw new common_2.UnauthorizedException('Invalid refresh token');
        const { id, count } = (await this.verifyAuthToken(value, 'refresh'));
        const user = await this.getUserMessage('USER_BY_PAYLOAD', {
            id,
            count,
        });
        const [accessToken, refreshToken] = await this.generateAuthTokens(user);
        this.saveRefreshCookie(res, refreshToken);
        return { accessToken };
    }
    async sendResetPasswordEmail({ email, }) {
        let user;
        try {
            user = await this.getUserMessage('USER_BY_EMAIL', { email });
        }
        catch (e) {
            return new gql_1.LocalMessageType('Password reset email sent');
        }
        if (user) {
            const resetToken = await this.generateAuthToken({ id: user.id, count: user.count }, 'resetPassword');
            const url = `${this.url}/reset-password/${resetToken}/`;
            this.emailService.sendPasswordResetEmail(user, url);
        }
        return new gql_1.LocalMessageType('Password reset email sent');
    }
    async resetPassword({ resetToken, password1, password2, }) {
        const { id, count } = (await this.verifyAuthToken(resetToken, 'resetPassword'));
        if (password1 !== password2)
            throw new common_2.BadRequestException('Passwords do not match');
        await this.getUserMessage('CHANGE_USER_PASSWORD', {
            id,
            count,
            password1,
            password2,
        });
        return new gql_1.LocalMessageType('Password reseted successfully');
    }
    async updatePassword(res, userId, { password, password1, password2 }) {
        const user = await this.getUserMessage('UPDATE_USER_PASSWORD', {
            userId,
            password,
            password1,
            password2,
        });
        const [accessToken, refreshToken] = await this.generateAuthTokens(user);
        this.saveRefreshCookie(res, refreshToken);
        return { accessToken };
    }
    async verifyAuthToken(token, type) {
        const secret = this.configService.get(`jwt.${type}.secret`);
        try {
            return await (0, utils_1.verifyToken)(token, secret, type === 'access' ? ['RS256'] : ['HS256']);
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new common_2.UnauthorizedException('Token has expired');
            }
            else {
                throw new common_2.UnauthorizedException(error.message);
            }
        }
    }
    async sendConfirmationEmail(user) {
        const emailToken = await this.generateAuthToken({ id: user.id, count: user.count }, 'confirmation');
        const url = `${this.url}/confirm-email/${emailToken}/`;
        await this.emailService.sendConfirmationEmail(user, url);
        return emailToken;
    }
    async generateAuthTokens({ id, count, name, }) {
        const profiles = await this.getMessageProfiles(id);
        const roles = {};
        for (const profile of profiles) {
            const { institutionId, profileId, role, status } = profile;
            roles[institutionId] = {
                id: profileId,
                role,
                status,
            };
        }
        return Promise.all([
            this.generateAuthToken({ id, roles, name }, 'access'),
            this.generateAuthToken({ id, count }, 'refresh'),
        ]);
    }
    async generateAuthToken(payload, type) {
        const { secret, time } = this.configService.get(`jwt.${type}`);
        return await this.commonService.throwInternalError((0, utils_1.generateToken)(payload, secret, time, type === 'access' ? 'RS256' : 'HS256'));
    }
    saveRefreshCookie(res, token) {
        res.cookie(this.cookieName, token, {
            secure: !this.testing,
            httpOnly: true,
            signed: true,
            path: '/api/auth/refresh-access',
            expires: new Date(Date.now() + this.refreshTime),
        });
    }
    async getUserMessage(cmd, input) {
        const message = await this.commonService.throwInternalError((0, rxjs_1.firstValueFrom)(this.usersClient
            .send({ cmd }, Object.assign({ apiId: this.authNamespace }, input))
            .pipe((0, rxjs_1.timeout)(2000))));
        if (message.status === 'error')
            throw new common_2.BadRequestException(message.message);
        return message.message;
    }
    async getMessageProfiles(userId) {
        const message = await this.commonService.throwInternalError((0, rxjs_1.firstValueFrom)(this.usersClient
            .send({ cmd: 'USER_PROFILES' }, {
            apiId: this.authNamespace,
            userId,
        })
            .pipe((0, rxjs_1.timeout)(2000))));
        if (message.status === 'error')
            throw new common_2.BadRequestException(message.message);
        return message.message;
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_2.Injectable)(),
    __param(3, (0, common_2.Inject)('USER_SERVICE')),
    __param(4, (0, common_2.Inject)(common_2.CACHE_MANAGER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        email_service_1.EmailService,
        common_1.CommonService,
        microservices_1.ClientProxy, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map