import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { IEmailConfig } from '../config/interfaces/email-config.interface';
import { confirmationEmail } from './templates/confirmation';
import { loginConfirmationEmail } from './templates/login-confirmation';
import { passwordResetEmail } from './templates/password-reset';
import { IMessageUser } from '@app/common/interfaces';

@Injectable()
export class EmailService {
  private readonly transport = createTransport(
    this.configService.get<IEmailConfig>('email'),
  );
  private readonly email = `"Your App" <${this.configService.get<string>(
    'EMAIL_USER',
  )}>`;

  constructor(private readonly configService: ConfigService) {}

  public async sendConfirmationEmail(
    { name, email }: IMessageUser,
    url: string,
  ): Promise<void> {
    await this.sendEmail(
      email,
      `Confirm your email ${name}`,
      confirmationEmail(name, url),
    );
  }

  public async sendPasswordResetEmail(
    { name, email }: IMessageUser,
    url: string,
  ): Promise<void> {
    await this.sendEmail(
      email,
      `Reset your password ${name}`,
      passwordResetEmail(name, url),
    );
  }

  public async sendAccessCode(
    { email, name }: IMessageUser,
    accessCode: string,
  ): Promise<void> {
    await this.sendEmail(
      email,
      `Your access code ${name}`,
      loginConfirmationEmail(name, accessCode),
    );
  }

  private async sendEmail(
    to: string,
    subject: string,
    html: string,
  ): Promise<void> {
    await this.transport.sendMail({
      from: this.email,
      subject,
      to,
      html,
    });
  }
}
