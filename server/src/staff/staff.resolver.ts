import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StaffService } from './staff.service';
import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.input';

@Resolver('Staff')
export class StaffResolver {

}
