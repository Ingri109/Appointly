import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // Для хешування

import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const existingUser = await this.findByEmail(createUserInput.email);
    if (existingUser) {
      throw new ConflictException('Користувач з таким email вже існує');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserInput.password, salt);

    const user = this.userRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.createQueryBuilder('user')
    .where('user.email = :email', { email })
    .addSelect('user.password') 
    .getOne();
  }


  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    if (!id) {
      throw new NotFoundException(`ID не передано`);
    }
  
    // 2. Хешування пароля (залишаємо вашу логіку)
    if (updateUserInput.password) {
        const salt = await bcrypt.genSalt();
        updateUserInput.password = await bcrypt.hash(updateUserInput.password, salt);
    }
  
    // 3. ✅ КРИТИЧНЕ ВИПРАВЛЕННЯ:
    // Створюємо копію об'єкта input, щоб не мутувати оригінал
    const { id: _, ...updateData } = updateUserInput;
  
    // 4. Формуємо об'єкт для preload явно
    // Спочатку ID, потім всі інші поля
    const userToUpdate = {
        id: id,
        ...updateData
    };
  
    // 5. Preload
    const user = await this.userRepository.preload(userToUpdate);
  
    if (!user) {
      throw new NotFoundException(`Користувача з ID ${id} не знайдено`);
    }
  
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return (result.affected || 0) > 0;
  }

  async updateRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
    let hashedToken: string | null = null;

    if (refreshToken) {
      const salt = await bcrypt.genSalt();
      hashedToken = await bcrypt.hash(refreshToken, salt);
    }

    await this.userRepository.update(userId, {
      hashedRefreshToken: hashedToken, 
    });
  }
}
