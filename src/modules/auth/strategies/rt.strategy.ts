import { jwtConstants } from '@modules/auth/strategies/constants';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

///////////////////////////////////////////////////////

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // This means that if our route is supplied with an expired JWT,
      // the request will be denied and a 401 Unauthorized response sent
      ignoreExpiration: false,
      secretOrKey: jwtConstants.rt_secret,
      // Get the refresh token also along with auth-jwt token
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
