import {
  IsString,
  IsStrongPassword,
  IsEmail,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  // @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  otp: number;
}
