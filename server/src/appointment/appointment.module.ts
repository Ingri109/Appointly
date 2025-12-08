import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';
import { Appointment } from './entities/appointment.entity';

import { StaffModule } from '../staff/staff.module'; 
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]), 
    StaffModule, 
    UserModule, 
    JwtModule.register({
      secret: 'at-secret', 
      signOptions: { expiresIn: '60m' },
    }), 
  ],
  providers: [
    AppointmentResolver, 
    AppointmentService
  ],
  exports: [AppointmentService], 
})
export class AppointmentModule {}