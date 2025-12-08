import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { StaffService } from '../staff/staff.service'; //
import { UserService } from '../user/user.service'; //

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly staffService: StaffService,
    private readonly userService: UserService,
  ) {}

  // Створення візиту
  async create(
    input: CreateAppointmentInput,
    userId: string,
  ): Promise<Appointment> {
    const { staffId, date, time } = input;

    // 1. Перевіряємо, чи існує лікар
    const staff = await this.staffService.findOne(staffId);
    if (!staff) throw new NotFoundException('Nie znaleziono lekarza');

    // 2. ПЕРЕВІРКА: Чи є вже запис на цей час?
    const existingAppointment = await this.appointmentRepository.findOne({
      where: {
        staff: { id: staffId },
        date: date, // TypeORM порівнює рядки 'YYYY-MM-DD'
        time: time,
      },
    });

    if (existingAppointment) {
      throw new ConflictException('Ten czas jest już zarezerwowany. Wybierz inny.');
    }

    const user = await this.userService.findOne(userId);

    if (!user) throw new NotFoundException('Nie znaleziono użytkownika');

    // 4. Створюємо запис
    const appointment = this.appointmentRepository.create({
      date,
      time,
      status: 'CONFIRMED',
      staff, // Зв'язуємо об'єкт лікаря
      user, // Зв'язуємо об'єкт юзера
    });

    return this.appointmentRepository.save(appointment);
  }

  // Отримати список зайнятих годин для конкретного лікаря і дати
  async getBookedSlots(staffId: string, date: string): Promise<string[]> {
    const appointments = await this.appointmentRepository.find({
      where: {
        staff: { id: staffId },
        date: date,
      },
      select: ['time'], // Нам потрібен тільки час
    });

    // Повертаємо масив рядків: ["09:00", "14:30"]
    return appointments.map((app) => app.time);
  }

  async findAllByUserId(userId: string): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['staff'],
      order: {
        date: 'ASC', 
        time: 'ASC',
      },
    });
  }
}
