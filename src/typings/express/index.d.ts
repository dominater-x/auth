declare namespace Express {
  export interface Request {
    body: {
      email: string;
      otp: string;
    };
  }
}
