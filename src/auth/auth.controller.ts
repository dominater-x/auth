import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('/signup')
  async signup(@Body() body: SignupDto) {
    const data = await this.service.signup(body);
    return { status: 'success', message: 'User Created Successfully', data };
  }

  @Post('/login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const data = await this.service.login(body);

    const token = this.jwtService.sign({ userId: data.id });
    res.cookie('token', token, { httpOnly: true });

    res.status(HttpStatus.ACCEPTED).json({
      status: 'success',
      message: 'login successfull',
      data,
    });
  }
}
