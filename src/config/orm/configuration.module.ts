import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import configuration from './configration';
import { OrmConfigService } from './configuration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
    }),
  ],
  providers: [ConfigService, OrmConfigService],
  exports: [ConfigService, OrmConfigService],
})
export class OrmConfigModule {}
