import { MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { IMailerTransport } from '../common/interfaces';
export declare class MailerConfig implements MailerOptionsFactory {
    private readonly configService;
    constructor(configService: ConfigService);
    createMailerOptions(): {
        transport: IMailerTransport;
        templates: {
            dir: string;
            adapter: HandlebarsAdapter;
            options: {
                strict: boolean;
            };
        };
    };
}
