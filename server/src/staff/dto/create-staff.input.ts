import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsOptional, IsDateString, IsInt } from 'class-validator';

@InputType()
export class CreateStaffInput {
  @Field()
  @IsString()
  fullName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field(() => Int)
  @IsInt()
  roomNumber: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  specialty?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;
}