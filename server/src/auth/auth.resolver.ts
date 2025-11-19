import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthResponse, LoginInput, RegisterInput } from './dto/auth.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async register(
    @Args('registerInput') registerInput: RegisterInput,
    @Context() context: { res: Response },
  ) {
    const { accessToken, refreshToken, user } = await this.authService.register(registerInput);

    this.setRefreshTokenCookie(context.res, refreshToken);

    return { accessToken, user };
  }

  @Mutation(() => AuthResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: { res: Response },
  ) {
    const { accessToken, refreshToken, user } = await this.authService.login(loginInput);
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

  private setRefreshTokenCookie(res: Response, token: string) {
    res.cookie('refreshToken', token, {
      httpOnly: true, 
      secure: true,   
      sameSite: 'lax', 
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
  }
}
