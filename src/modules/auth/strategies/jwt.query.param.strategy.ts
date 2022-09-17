import { jwtConstants } from '@modules/auth/strategies/constants';
import { JwtUserDataDto } from '@modules/auth/dto/response-dto/jwt.user.data.dto';
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

  validate(payload: JwtUserDataDto) {
    return payload;
  }
}
