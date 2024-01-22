import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { renderTemplateData } from '../dtos/mail-data.dto';
import * as pug from 'pug';
import { Mail } from '../constants/mail.constants';

@Injectable()
export class RenderTemplate {
  public render(data: renderTemplateData): string {
    const templatePath = path.join(
      __dirname,
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
