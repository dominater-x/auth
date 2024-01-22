import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { GenerateOtpDto } from './dtos/generate-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly service: OtpService) {}
  @Post('/generate')
  async generateOtp(@Body() body: GenerateOtpDto) {
    await this.service.generateOtp(body);
    return { status: 'success', message: 'otp sent successfully' };
  }
}
