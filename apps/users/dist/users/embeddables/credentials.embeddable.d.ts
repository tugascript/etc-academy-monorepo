import { ICredentials } from '../interfaces/credentials.interface';
export declare class CredentialsEmbeddable {
    version: number;
    lastPassword: string;
    updatedAt: number;
    constructor(input?: Partial<ICredentials>);
    updatePassword(password: string): void;
    updateVersion(): void;
}
