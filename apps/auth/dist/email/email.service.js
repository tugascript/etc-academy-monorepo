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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer_1 = require("nodemailer");
const confirmation_1 = require("./templates/confirmation");
const login_confirmation_1 = require("./templates/login-confirmation");
const password_reset_1 = require("./templates/password-reset");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.transport = (0, nodemailer_1.createTransport)(this.configService.get('email'));
        this.email = `"Your App" <${this.configService.get('EMAIL_USER')}>`;
    }
    async sendConfirmationEmail({ name, email }, url) {
        await this.sendEmail(email, `Confirm your email ${name}`, (0, confirmation_1.confirmationEmail)(name, url));
    }
    async sendPasswordResetEmail({ name, email }, url) {
        await this.sendEmail(email, `Reset your password ${name}`, (0, password_reset_1.passwordResetEmail)(name, url));
    }
    async sendAccessCode({ email, name }, accessCode) {
        await this.sendEmail(email, `Your access code ${name}`, (0, login_confirmation_1.loginConfirmationEmail)(name, accessCode));
    }
    async sendEmail(to, subject, html) {
        await this.transport.sendMail({
            from: this.email,
            subject,
            to,
            html,
        });
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map