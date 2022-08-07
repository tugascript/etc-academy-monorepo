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
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const common_2 = require("../common");
let EmailService = class EmailService {
    constructor(mailerService, configService, commonService) {
        this.mailerService = mailerService;
        this.configService = configService;
        this.commonService = commonService;
        this.fromEmail = this.configService.get('EMAIL_USER');
    }
    async sendInvitation(name, email, role, institutionName, userName, link) {
        await this.commonService.throwInternalError(this.mailerService.sendMail({
            to: email,
            from: this.fromEmail,
            subject: `Etc.Academy Invitation ${name}`,
            template: 'invitation',
            context: {
                recipient: name,
                sender: userName,
                institution: institutionName,
                role: role.toLowerCase(),
                link,
            },
        }));
    }
    async sendRequest({ name, email }, role, { institution, user }) {
        await this.commonService.throwInternalError(this.mailerService.sendMail({
            to: email,
            from: this.fromEmail,
            subject: `Etc.Academy Profile Request ${name}`,
            template: 'request',
            context: {
                recipient: name,
                sender: user.name,
                institution: institution.name,
                role: role.toLowerCase(),
            },
        }));
    }
};
EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService,
        common_2.CommonService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map