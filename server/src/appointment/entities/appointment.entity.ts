import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Staff } from '../../staff/entities/staff.entity';

@ObjectType()
@Entity('appointments')
export class Appointment {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'date' })
  date: string; // YYYY-MM-DD

  @Field()
  @Column()
  time: string; // HH:MM

  @Field()
  @Column({ default: 'PENDING' }) // PENDING, CONFIRMED, CANCELLED
  status: string;

  @Field(() => Staff)
  @ManyToOne(() => Staff, (staff) => staff.appointments, { onDelete: 'CASCADE' })
  staff: Staff;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.appointments, { onDelete: 'CASCADE' })
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}