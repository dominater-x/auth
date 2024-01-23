import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './entity/otp.entity';
import { EmailSender } from 'src/common/helper/mail';
import { Utils } from 'src/common/helper/utils';

@Module({
  imports: [TypeOrmModule.forFeature([Otp])],
  controllers: [OtpController],
  providers: [OtpService, EmailSender, Utils],
  exports: [OtpService],
})
export class OtpModule {}
