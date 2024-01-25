import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { renderTemplateData } from './dtos/mail-data.dto';
import { Mail } from '../../constants/mail.constants';
import * as path from 'path';
import * as pug from 'pug';
import { MailConfigService } from 'src/config/mail/configuration.service';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly config: MailConfigService) {
    this.transporter = nodemailer.createTransport(
      this.config.settings as nodemailer.TransportOptions,
    );

    this.transporter
      .verify()
      .then(() => Logger.log('Connected to EMAIL SERVER'))
      .catch((err) => {
        Logger.error(err);
        Logger.warn(
          'Unable to connect to email server. Make sure you have configured the SMTP options in .env',
        );
      });
  }

  async sendEmail(mailOptions: nodemailer.SendMailOptions): Promise<void> {
    await this.transporter.sendMail(mailOptions);
    this.transporter.close();
  }

  async sendMailWrapper(data: renderTemplateData): Promise<void> {
    const text = this.templateRender(data);

    const mailOptions: nodemailer.SendMailOptions = {
      from: Mail.EmailFrom,
      to: data.to,
      subject: data.subject,
      text,
    };

    await this.sendEmail(mailOptions);
  }

  templateRender(data: renderTemplateData): string {
    const templatePath = path.join(
      __dirname,
      '..',
      '..',
      'templates',
      `${data.template}.pug`,
    );
    return pug.compileFile(templatePath)({
      ...data,
      brand: Mail.Brand,
      url: Mail.Url,
    });
  }
}
