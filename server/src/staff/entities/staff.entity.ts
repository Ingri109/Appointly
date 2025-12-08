import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Appointment } from '../../appointment/entities/appointment.entity';

@ObjectType()
@Entity('staff')
export class Staff {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  fullName: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  specialty?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  url?: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  assessment?: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'date', nullable: true })
  dateOfBirth?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, type: 'varchar' })
  hashedRefreshToken?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Field(() => [Appointment], { nullable: true })
  @OneToMany(() => Appointment, (appointment) => appointment.staff)
  appointments?: Appointment[];
}