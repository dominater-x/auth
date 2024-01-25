import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}
  async signup(body: SignupDto): Promise<User> {
    body.password = await bcrypt.hash(body.password, 10);
    const data = this.repo.create(body);
    return await this.repo.save(data);
  }

  async login(body: LoginDto) {
    const data = await this.repo.findOne({
      where: {
        email: body.email,
      },
    });

    if (!data || !(await bcrypt.compare(body.password, data.password)))
      throw new HttpException('Wrong email or password', HttpStatus.NOT_FOUND);
    return data;
  }
}
