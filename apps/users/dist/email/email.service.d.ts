import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { CommonService } from 'src/common';
import { ProfileRoleEnum } from 'src/common/enums';
import { IProfile } from '../profiles/interfaces/profile.interface';
import { IUser } from '../users/interfaces/user.interface';
export declare class EmailService {
    private readonly mailerService;
    private readonly configService;
    private readonly commonService;
    private readonly fromEmail;
    constructor(mailerService: MailerService, configService: ConfigService, commonService: CommonService);
    sendInvitation(name: string, email: string, role: ProfileRoleEnum, institutionName: string, userName: string, link: string): Promise<void>;
    sendRequest({ name, email }: IUser, role: ProfileRoleEnum, { institution, user }: IProfile): Promise<void>;
}
