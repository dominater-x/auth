import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB: process.env.DB,
}));
