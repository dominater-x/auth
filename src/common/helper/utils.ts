import { Injectable } from '@nestjs/common';

@Injectable()
export class Utils {
  computeOtp() {
    const otp = parseInt(
      Math.floor(100000 + Math.random() * 900000)
        .toString()
        .slice(0, 6),
    );
    return otp;
  }

  isOtpExpired(createdAt: Date) {
    const past = new Date(createdAt);
    const present = new Date();
    const diff = Number(present) - Number(past);
    return diff / 60000 >= 5;
  }
}
