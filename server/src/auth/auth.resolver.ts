import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthResponse, LoginInput, RegisterInput } from './dto/auth.dto';
import { StaffAuthResponse } from '../staff/dto/staff-auth.response';
import { CreateStaffInput } from '../staff/dto/create-staff.input';
import { LoginStaffInput } from '../staff/dto/login-staff.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
    @Context() context: { res: Response },
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.register(registerInput);

    this.setRefreshTokenCookie(context.res, refreshToken);

    return { accessToken, user };
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: { res: Response },
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.login(loginInput);
    this.setRefreshTokenCookie(context.res, refreshToken);

    return { accessToken, user };
  }

  @Mutation(() => Boolean)
  async logout(
    @Args('userId', { type: () => String }) userId: string,
    @Context() context: { res: Response },
  ) {
    await this.authService.logout(userId);
    context.res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return true;
  }

  //<-<-<-<- STAFF ->->->->
  @Mutation(() => StaffAuthResponse)
  async registerStaff(
    @Args('createStaffInput') createStaffInput: CreateStaffInput,
    @Context() context: { res: Response },
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.registerStaff(createStaffInput);
    this.setRefreshTokenCookie(context.res, refreshToken);
    return { accessToken, user };
  }

  @Mutation(() => StaffAuthResponse)
  async loginStaff(
    @Args('loginStaffInput') loginStaffInput: LoginStaffInput,
    @Context() context: { res: Response },
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.loginStaff(loginStaffInput);
    this.setRefreshTokenCookie(context.res, refreshToken);
    return { accessToken, user };
  }

  @Mutation(() => Boolean)
  async logoutStaff(
    @Args('staffId') staffId: string,
    @Context() context: { res: Response },
  ) {
    await this.authService.logoutStaff(staffId);
    context.res.clearCookie('refreshToken'); // Параметри куки мають бути такі ж як при створенні
    return true;
  }

  private setRefreshTokenCookie(res: Response, token: string) {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
