import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  name: string;

  @Column()
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'date', nullable: true })
  dateOfBirth?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true, type: 'varchar' })
  hashedRefreshToken?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 5, nullable: true }) 
  bloodType?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 20, nullable: true }) 
  phone?: string;
}

