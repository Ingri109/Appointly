import { CreateStaffInput } from './create-staff.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStaffInput extends PartialType(CreateStaffInput) {
  @Field(() => String)
  id: string;
}