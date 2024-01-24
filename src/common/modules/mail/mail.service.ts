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
    // this.transporter = nodemailer.createTransport({
    //   host: 'sandbox.smtp.mailtrap.io',
    //   port: 465,
    //   secure: false,
    //   requireTLS: true,
    //   auth: {
    //     user: '2c80156b2354cd',
    //     pass: 'df3f8794ab875c',
    //   },
    //   logger: false,
    // } as any);
    console.log(this.config.settings);
    this.transporter = nodemailer.createTransport(this.config.settings as any);

    this.transporter
      .verify()
      .then(() => Logger.log('Connected to EMAIL SERVER'))
      .catch((err) => {
        // eslint-disable-next-line
				console.log(err);
        Logger.warn(
          'Unable to connect to email server. Make sure you have configured the SMTP options in .env',
        );
      });
  }

  async sendEmail(mailOptions: nodemailer.SendMailOptions): Promise<void> {
    this.transporter.sendMail(
      mailOptions,
      (error: Error | null, info: nodemailer.SentMessageInfo) => {
        if (error) {
          Logger.error('Error:', error.message);
        } else {
          Logger.warn('Email sent:', info.response);
        }

        // Close the transporter after sending the email
        this.transporter.close();
      },
    );
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
