import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import type {User} from './user.entity.js';
import { City } from '../../location/entities/city.entity.js';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  building: string;

  @Column({ nullable: true })
  apartment: string;

  @Column()
  postalCode: string;

  @Column({ default: false })
  isDefault: boolean;

  @ManyToOne('User', (user: User) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne('City', { eager: true })
  @JoinColumn({ name: 'city_id' })
  city: City;
}