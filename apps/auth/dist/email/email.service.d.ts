import { ConfigService } from '@nestjs/config';
import { IMessageUser } from 'src/common/interfaces';
export declare class EmailService {
    private readonly configService;
    private readonly transport;
    private readonly email;
    constructor(configService: ConfigService);
    sendConfirmationEmail({ name, email }: IMessageUser, url: string): Promise<void>;
    sendPasswordResetEmail({ name, email }: IMessageUser, url: string): Promise<void>;
    sendAccessCode({ email, name }: IMessageUser, accessCode: string): Promise<void>;
    private sendEmail;
}
