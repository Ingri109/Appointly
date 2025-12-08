// server/src/appointment/dto/create-appointment.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  staffId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  date: string; // Формат YYYY-MM-DD

  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Time must be in HH:MM format' })
  time: string; // Формат HH:MM
}