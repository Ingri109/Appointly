import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { StaffService } from '../staff/staff.service';
import { UserService } from '../user/user.service';

// 1. Мокаємо (імітуємо) Репозиторій
const mockAppointmentRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((appointment) =>
    Promise.resolve({ id: 'uuid-test', ...appointment }),
  ),
  find: jest.fn().mockImplementation(() => Promise.resolve([])),
  findOne: jest.fn().mockImplementation(() => Promise.resolve(null)), // Повертаємо null, ніби запису ще немає
};

// 2. Мокаємо StaffService (бо він використовується в create)
const mockStaffService = {
  findOne: jest.fn().mockResolvedValue({ id: 'staff-1', name: 'Doctor House' }),
};

// 3. Мокаємо UserService (бо він використовується в create)
const mockUserService = {
  findOne: jest.fn().mockResolvedValue({ id: 'user-1', email: 'test@test.com' }),
};

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: mockAppointmentRepository,
        },
        // Додаємо провайдери для залежностей
        {
          provide: StaffService,
          useValue: mockStaffService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Тест створення візиту
  it('should create a new appointment', async () => {
    const dto = {
      staffId: 'staff-1',
      date: '2025-05-20',
      time: '10:00',
    };
    const userId = 'user-1';

    // Викликаємо метод create з ДВОМА аргументами
    const result = await service.create(dto, userId);

    expect(result).toHaveProperty('id');
    // Перевіряємо поля, які дійсно існують в entity
    expect(result.time).toEqual('10:00');
    expect(result.date).toEqual('2025-05-20');
    expect(mockAppointmentRepository.create).toHaveBeenCalled();
  });

  // Тест пошуку (використовуємо findAllByUserId замість findAll)
  it('should return an array of appointments for user', async () => {
    const userId = 'user-1';
    
    // Викликаємо правильний метод
    const result = await service.findAllByUserId(userId);
    
    expect(result).toEqual([]);
    expect(mockAppointmentRepository.find).toHaveBeenCalled();
  });
});