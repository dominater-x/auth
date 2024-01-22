import { Expose } from 'class-transformer';

export class UserSerializeDto {
  @Expose()
  email: string;

  @Expose()
  name: string;
}
