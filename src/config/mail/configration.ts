import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  host: process.env.SMTP_HOST,
  port: process.env.PORT,
  user: process.env.SMTP_USERNAME,
  pass: process.env.SMTP_PASSWORD,
}));