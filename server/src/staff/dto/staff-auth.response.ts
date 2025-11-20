import { ObjectType, Field } from '@nestjs/graphql';
import { Staff } from '../entities/staff.entity';

@ObjectType()
export class StaffAuthResponse {
  @Field()
  accessToken: string;

  @Field(() => Staff)
  user: Staff;
}