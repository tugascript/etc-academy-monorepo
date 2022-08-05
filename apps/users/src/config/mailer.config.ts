import { IMailerTransport } from '@app/common/interfaces';
import { MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerConfig implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createMailerOptions() {
    return {
      transport: this.configService.get<IMailerTransport>('email'),
      templates: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
