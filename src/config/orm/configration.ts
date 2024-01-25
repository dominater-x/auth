import { registerAs } from '@nestjs/config';

export default registerAs('orm', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  db: process.env.DB,
}));
