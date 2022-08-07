interface IMailerAuth {
  user: string;
  pass: string;
}

export interface IMailerTransport {
  host: string;
  port: number;
  secure: boolean;
  auth: IMailerAuth;
}
