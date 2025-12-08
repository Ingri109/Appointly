import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

@InputType()
export class CreateStaffInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  specialty?: string;

  // ✅ Використовуємо пряму назву 'location'
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  url?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  assessment?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}