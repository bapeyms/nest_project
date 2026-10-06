import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity.js';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Country, (country: Country) => country.cities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'country_id' })
  country: Country;
}