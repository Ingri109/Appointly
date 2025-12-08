import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
// 1. Прибираємо UseGuards, бо у нас поки немає Стратегії
import { UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly jwtService: JwtService, // 3. Інжектуємо JwtService
  ) {}

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput,
    @Context() context, 
  ) {
    // 4. ✅ РУЧНА АВТОРИЗАЦІЯ
    // Отримуємо заголовок Authorization: "Bearer <token>"
    const authHeader = context.req.headers.authorization;

    if (!authHeader) {
      throw new Error('Немає токена авторизації (Authorization header missing)');
    }

    // Витягуємо сам токен (відрізаємо слово "Bearer ")
    const token = authHeader.split(' ')[1];

    try {
      // Розшифровуємо токен
      const decoded = this.jwtService.verify(token, { secret: 'at-secret' }); // 'at-secret' має співпадати з тим, що в auth.service.ts
      
      // Дістаємо ID користувача (в токені він називається 'sub')
      const userId = decoded.sub;

      console.log("User ID form Token:", userId);

      return this.appointmentService.create(createAppointmentInput, userId);

    } catch (e) {
      throw new Error('Недійсний токен або термін дії минув');
    }
  }

  @Query(() => [String])
  async getBookedSlots(
    @Args('staffId') staffId: string,
    @Args('date') date: string,
  ) {
    return this.appointmentService.getBookedSlots(staffId, date);
  }

  @Query(() => [Appointment], { name: 'myAppointments' })
  @UseGuards(JwtAuthGuard) // ✅ Захищаємо: тільки для залогінених
  async getMyAppointments(@Context() context) {
    const userId = context.req.user.userId; // Беремо ID з токена
    return this.appointmentService.findAllByUserId(userId);
  }
}