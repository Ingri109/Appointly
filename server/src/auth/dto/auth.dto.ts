import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength, IsString } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail({}, { message: 'Nieprawidłowy adres e-mail' })
  email: string;

  @Field()
  @MinLength(6, { message: 'Nieprawidłowy adres e-mail' })
  password: string;

  @Field()
  @IsString()
  name: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

import { ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
