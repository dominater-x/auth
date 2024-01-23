import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OtpModule } from './modules/otp/otp.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utils } from './common/helper/utils';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'auth',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    OtpModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, Utils],
})
export class AppModule {}
