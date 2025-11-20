import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

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

  @Field(() => Int)
  @Column()
  roomNumber: number

  @Field()
  @Column()
  specialty?: string

  @Field(() => String, { nullable: true })
  @Column({ type: 'date', nullable: true })
  dateOfBirth?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, type: 'varchar' })
  hashedRefreshToken?: string | null;
}
