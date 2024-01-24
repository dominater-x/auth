import { AppConfigModule } from './config/app/configuration.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OtpModule } from './modules/otp/otp.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { UtilModule } from './common/modules/utils/util.module';
import { MailModule } from './common/modules/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'auth',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UtilModule,
    OtpModule,
    UserModule,
    AuthModule,
    MailModule,
    AppConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
