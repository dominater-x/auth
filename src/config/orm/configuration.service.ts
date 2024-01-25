import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class OrmConfigService {
  constructor(private readonly service: ConfigService) {}

  get host(): string {
    return this.service.get<string>('orm.host');
  }

  get port(): number {
    return this.service.get<number>('orm.port');
  }

  get db(): string {
    return this.service.get<string>('orm.db');
  }

  get setting(): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      host: this.host,
      port: this.port,
      database: this.db,
      entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
      logging: true,
    };
  }
}
