import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class GenerateOtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsEnum(['signup', 'forgot'])
  reason: string;
}
