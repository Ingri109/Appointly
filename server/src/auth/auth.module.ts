import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { StaffModule } from '../staff/staff.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
// 👇 1. Додаємо нові імпорти
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, 
    StaffModule,
    // 👇 2. Реєструємо Passport
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // Цей ключ має збігатися з тим, що в JwtStrategy
        secret: configService.get<string>('JWT_SECRET') || 'secretKey',
        signOptions: { expiresIn: '30m' },
      }),
    }),
  ],
  providers: [
    AuthResolver, 
    AuthService,
    JwtStrategy 
  ],
  exports: [PassportModule, JwtStrategy, AuthService],
})
export class AuthModule {}