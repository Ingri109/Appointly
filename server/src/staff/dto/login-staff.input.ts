import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class LoginStaffInput {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsString()
  password: string;
}