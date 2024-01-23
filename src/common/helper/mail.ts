import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { renderTemplateData } from '../dtos/mail-data.dto';
import { RenderTemplate } from './render-template';
import { Mail } from '../constants/mail.constants';

@Injectable()
export class EmailSender {
  private transporter: nodemailer.Transporter;
  private template: RenderTemplate;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 465,
      secure: false,
      requireTLS: true,
      auth: {
        user: '2c80156b2354cd',
        pass: 'df3f8794ab875c',
      },
      logger: false,
    } as any);

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
    this.template = new RenderTemplate();
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
    const text = this.template.render(data);

    const mailOptions: nodemailer.SendMailOptions = {
      from: Mail.EmailFrom,
      to: data.to,
      subject: data.subject,
      text,
    };

    await this.sendEmail(mailOptions);
  }
}
