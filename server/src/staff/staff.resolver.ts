import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity';
import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.input';

@Resolver(() => Staff)
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  // --- СТВОРЕННЯ (Create) ---
  @Mutation(() => Staff, { name: 'createStaff' }) 
  createStaff(@Args('createStaffInput') createStaffInput: CreateStaffInput) {
    return this.staffService.create(createStaffInput);
  }

  // --- ОТРИМАННЯ ВСІХ (Read All) ---
  @Query(() => [Staff], { name: 'allStaff' })
  findAll() {
    return this.staffService.findAll();
  }

  // --- ПОШУК ОДНОГО ПО ID (Read One) ---
  @Query(() => Staff, { name: 'staffMember' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.staffService.findOne(id);
  }

  // --- ОНОВЛЕННЯ (Update) ---
  // Примітка: Переконайся, що метод update реалізований у StaffService
  @Mutation(() => Staff)
  updateStaff(@Args('updateStaffInput') updateStaffInput: UpdateStaffInput) {
    return this.staffService.update(updateStaffInput.id, updateStaffInput);
  }

  @Mutation(() => Boolean)
  removeStaff(@Args('id', { type: () => String }) id: string) {
    return this.staffService.remove(id);
  }
}