import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import type { City } from './city.entity.js';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  isoCode: string;

  @OneToMany('City', (city: City) => city.country, { cascade: true })
  cities: City[];
}