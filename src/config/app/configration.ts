import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  url: process.env.URL,
  port: process.env.PORT || 4000,
}));
