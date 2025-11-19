import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsOptional, IsDateString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail({}, { message: 'Некоректний формат email' })
  email: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @MinLength(6, { message: 'Пароль має бути мінімум 6 символів' })
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;
}