import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailConfigModule } from 'src/config/mail/configuration.module';

@Global()
@Module({
  imports: [MailConfigModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
