import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class ValidateOtp {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  otp: number;
}
