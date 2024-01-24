import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly service: ConfigService) {}

  get name(): string {
    return this.service.get<string>('app.name');
  }

  get port(): number {
    return this.service.get<number>('app.port');
  }

  get url(): string {
    return this.service.get<string>('app.url');
  }
}
