import { jwtConstants } from '@modules/auth/strategies/constants';
import { JwtUserData } from '@modules/auth/types/jwt.user.data.type';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // This means that if our route is supplied with an expired JWT,
      // the request will be denied and a 401 Unauthorized response sent
      ignoreExpiration: false,
      // instead of jwtConstants, get configs injected here in this class
      secretOrKey: jwtConstants.at_secret,
    });
  }

  validate(payload: JwtUserData) {
    return payload;
  }
}
