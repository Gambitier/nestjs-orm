import { Exclude } from 'class-transformer';

export class Token {
  accessToken: string;

  @Exclude()
  refreshToken: string;
}
