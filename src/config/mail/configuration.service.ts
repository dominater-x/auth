import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailTransporterOptions } from '../../common/interfaces/mail-transporter.interface';

@Injectable()
export class MailConfigService {
  constructor(private readonly service: ConfigService) {}

  get host(): string {
    return this.service.get<string>('mail.host');
  }

  get port(): number {
    return this.service.get<number>('mail.port');
  }

  get user(): string {
    return this.service.get<string>('mail.user');
  }

  get pass(): string {
    return this.service.get<string>('mail.pass');
  }

  get settings(): MailTransporterOptions {
    return {
      host: this.host,
      port: this.port,
      secure: false,
      requireTLS: true,
      auth: {
        user: this.user,
        pass: this.pass,
      },
      logger: false,
    } as MailTransporterOptions;
  }
}
