export interface MailTransporterOptions {
  host: string;
  port: number;
  secure: Boolean;
  requireTLS: Boolean;
  auth: {
    user: string;
    pass: string;
  };
  logger: Boolean;
}
