import { jwtConstants } from '@modules/auth/strategies/constants';
import { JwtUserData } from '@modules/auth/types/jwt.user.data.type';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

///////////////////////////////////////////////////////////

@Injectable()
export class JwtFromQueryParamStrategy extends PassportStrategy(
  Strategy,
  'JwtQueryParamStrategy',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.at_secret,
    });
  }

  validate(payload: JwtUserData) {
    return payload;
  }
}
