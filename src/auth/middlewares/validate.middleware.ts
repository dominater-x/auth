import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from '@nestjs/common';
import { OtpService } from '../../otp/otp.service';
import { ValidateOtp } from '../../otp/dtos/validate-otp.dto';

@Injectable()
export class ValidateMiddleware implements NestMiddleware {
  constructor(private readonly service: OtpService) {}
  async use(req: Request & ValidateOtp, res: Response, next: any) {
    const data = req.body as unknown as ValidateOtp;
    if (!data.email || !data.otp) {
      throw new HttpException(
        'Email and OTP are required for validation.',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.service.validateOtp(data);
    next();
  }
}
