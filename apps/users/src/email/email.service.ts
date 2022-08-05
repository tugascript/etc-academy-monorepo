import { CommonService } from '@app/common';
import { ProfileRoleEnum } from '@app/common/enums';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IProfile } from '../profiles/interfaces/profile.interface';
import { IUser } from '../users/interfaces/user.interface';

@Injectable()
export class EmailService {
  private readonly fromEmail = this.configService.get<string>('EMAIL_USER');

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly commonService: CommonService,
  ) {}

  public async sendInvitation(
    name: string,
    email: string,
    role: ProfileRoleEnum,
    institutionName: string,
    userName: string,
    link: string,
  ): Promise<void> {
    await this.commonService.throwInternalError(
      this.mailerService.sendMail({
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
      }),
    );
  }

  public async sendRequest(
    { name, email }: IUser,
    role: ProfileRoleEnum,
    { institution, user }: IProfile,
  ): Promise<void> {
    await this.commonService.throwInternalError(
      this.mailerService.sendMail({
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
      }),
    );
  }
}
