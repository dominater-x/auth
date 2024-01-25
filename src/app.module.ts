
import { AppConfigModule } from './config/app/configuration.module';
import { OrmConfigModule } from './config/orm/configuration.module';
import { OrmConfigService } from './config/orm/configuration.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { OtpModule } from './modules/otp/otp.module';
import { AuthModule } from './modules/auth/auth.module';
import { UtilModule } from './common/modules/utils/util.module';
import { MailModule } from './common/modules/mail/mail.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [OrmConfigModule],
      inject: [OrmConfigService],
      useFactory: async (service: OrmConfigService) => service.setting,
    }),
    UtilModule,
    OtpModule,
    UserModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// GtDtUAvyhW
