import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 👇 ВАЖЛИВО: Беремо той самий ключ, що і в AuthModule
    //   secretOrKey: configService.get<string>('JWT_SECRET') || 'secretKey',
    secretOrKey: 'at-secret',
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    // NestJS автоматично покладе це в req.user
    return { userId: payload.sub, email: payload.email };
  }
}