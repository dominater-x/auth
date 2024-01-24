import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrmSetting } from './dto/orm-setting.dto';

@Injectable()
export class OrmConfigService {
  constructor(private readonly service: ConfigService) {}

  get host(): string {
    return this.service.get<string>('app.name');
  }

  get port(): number {
    return this.service.get<number>('app.port') + 1;
  }

  get db(): string {
    return this.service.get<string>('app.db');
  }

  get setting(): OrmSetting {
    return {
      type: 'mongodb',
      host: this.host,
      port: this.port,
      database: this.db,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    };
  }
}
