import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StaffService } from '../staff/staff.service';
import { RegisterInput, LoginInput } from './dto/auth.dto';
import { CreateStaffInput } from '../staff/dto/create-staff.input';
import { LoginStaffInput } from '../staff/dto/login-staff.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private staffService: StaffService,
    private jwtService: JwtService,
  ) {}

  async register(input: RegisterInput) {
    const existingUser = await this.userService.findByEmail(input.email);
    if (existingUser) {
      throw new BadRequestException(
        'Użytkownik o takim adresie e-mail już istnieje.',
      );
    }

    const newUser = await this.userService.create(input);

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return { ...tokens, user: newUser };
  }

  async login(input: LoginInput) {
    // --- DEBUG START ---

    const user = await this.userService.findByEmail(input.email);

    if (!user) {
      throw new UnauthorizedException('Nieprawidłowy adres e-mail lub hasło');
    }

    // Саме тут виникає помилка, якщо п.1 або п.3 пусті
    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Nieprawidłowy adres e-mail lub hasło');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async logout(userId: string) {
    await this.userService.updateRefreshToken(userId, null);
  }

  //<-<-<-<- STAFF ->->->->
  async registerStaff(input: CreateStaffInput) {
    const newStaff = await this.staffService.create(input);
    const tokens = await this.getTokens(newStaff.id, newStaff.email);
    await this.staffService.updateRefreshToken(
      newStaff.id,
      tokens.refreshToken,
    );

    return { ...tokens, user: newStaff };
  }

  async loginStaff(input: LoginStaffInput) {
    const staff = await this.staffService.findOne(input.id);
    if (!staff) {
      throw new UnauthorizedException(
        'Nie znaleziono pracownika o takim identyfikatorze.',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      input.password,
      staff.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Nieprawidłowe hasło');
    }

    const tokens = await this.getTokens(staff.id, staff.email);
    await this.staffService.updateRefreshToken(staff.id, tokens.refreshToken);

    return { ...tokens, user: staff };
  }

  async logoutStaff(staffId: string) {
    await this.staffService.updateRefreshToken(staffId, null);
  }

  //---- TOKEN ----
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

  async updateRefreshToken(userId: string, refreshToken: string) {
    await this.userService.updateRefreshToken(userId, refreshToken);
  }
}
