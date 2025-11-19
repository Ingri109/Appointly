import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterInput, LoginInput } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(input: RegisterInput) {
    const existingUser = await this.userService.findByEmail(input.email);
    if (existingUser) {
      throw new BadRequestException(
        'Użytkownik o takim adresie e-mail już istnieje.',
      );
    }

    const hashPassword = await bcrypt.hash(input.password, 10);
    const newUser = await this.userService.create({
      ...input,
      password: hashPassword,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return { ...tokens, user: newUser };
  }

  async login(input: LoginInput) {
    const user = await this.userService.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('Nieprawidłowy adres e-mail lub hasło'); 
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Nieprawidłowy adres e-mail lub hasło');
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async getTokens(userId: string, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: 'at-secret', expiresIn: '30m' },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: 'rt-secret', expiresIn: '7d' },
      ),
    ]);
    return { accessToken: at, refreshToken: rt };
  }
  
  async updateRefreshToken(userId: string, refreshToken: string){
    await this.userService.updateRefreshToken(userId, refreshToken);
  }

  async logout(userId: string) {
    await this.userService.updateRefreshToken(userId, null);
  }

}
