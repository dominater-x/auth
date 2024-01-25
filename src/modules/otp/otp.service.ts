import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GenerateOtpDto } from './dtos/generate-otp.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entity/otp.entity';
import { Repository } from 'typeorm';
import { MailService } from 'src/common/modules/mail/mail.service';
import { Mail } from 'src/common/constants/mail.constants';
import { ValidateOtp } from './dtos/validate-otp.dto';
import { UtilService } from 'src/common/modules/utils/util.service';
@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp) private readonly repo: Repository<Otp>,
    private readonly mail: MailService,
    private readonly utils: UtilService,
  ) {}

  async generateOtp(body: GenerateOtpDto): Promise<void> {
    const otp = this.utils.computeOtp();

    await this.repo.delete({ email: body.email });
    const otpInstance = this.repo.create({ ...body, otp });
    const data = await this.repo.save(otpInstance);

    await this.mail.sendMailWrapper({
      to: data.email,
      template: 'otp',
      username: data.email,
      subject: Mail.Signup,
      otp,
      expiresIn: Mail.ExpiresIn,
      reason: data.reason,
    });
  }

  async validateOtp(body: ValidateOtp): Promise<void> {
    const data = await this.repo.findOne({
      where: { email: body.email, otp: body.otp },
    });

    if (!data) throw new HttpException('OTP not found', HttpStatus.NOT_FOUND);
    if (this.utils.isOtpExpired(data.created_at))
      throw new HttpException(
        'Otp Expired, please generate one',
        HttpStatus.BAD_REQUEST,
      );
    await this.repo.delete(data);
  }
}
