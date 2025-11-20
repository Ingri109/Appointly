import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Staff } from './entities/staff.entity';
import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.input';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async create(createStaffInput: CreateStaffInput): Promise<Staff> {
    const existingStaff = await this.staffRepository.findOneBy({ email: createStaffInput.email });
    if (existingStaff) {
      throw new ConflictException('Працівник з таким email вже існує');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createStaffInput.password, salt);

    const newStaff = this.staffRepository.create({
      ...createStaffInput,
      password: hashedPassword,
    });

    return this.staffRepository.save(newStaff);
  }

  async findOne(id: string): Promise<Staff | null> {
    return this.staffRepository.findOneBy({ id });
  }
  
  async findAll(): Promise<Staff[]> {
    return this.staffRepository.find();
  }

  async update(id: string, updateStaffInput: UpdateStaffInput): Promise<Staff> {
    // Якщо міняємо пароль, його треба захешувати
    if (updateStaffInput.password) {
       const salt = await bcrypt.genSalt();
       updateStaffInput.password = await bcrypt.hash(updateStaffInput.password, salt);
   }

   const staff = await this.staffRepository.preload({
     ...updateStaffInput,
     id: id,
   });

   if (!staff) {
     throw new NotFoundException(`Працівника з ID ${id} не знайдено`);
   }

   return this.staffRepository.save(staff);
 }

 async remove(id: string): Promise<boolean> {
   const result = await this.staffRepository.delete(id);
   return (result.affected || 0) > 0;
 }
 
  async updateRefreshToken(staffId: string, refreshToken: string | null): Promise<void> {
    let hashedToken: string | null = null;

    if (refreshToken) {
      const salt = await bcrypt.genSalt();
      hashedToken = await bcrypt.hash(refreshToken, salt);
    }

    await this.staffRepository.update(staffId, {
      hashedRefreshToken: hashedToken,
    });
  }

  
}