// Entity (модель/сутність) - клас, який декорується через декоратор @Entity
// у цьому класі ми прописуємо поля майбутньої бази даних
import { OneToMany, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { Product } from '../product/product.entity.js';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({ length: 20, nullable: false })
  title: string;
  
  @Column({nullable: true})
  description: string
 
  @Column({ unique: true, length: 30 })
  slug: string;
 
  @Column({ type: 'varchar', nullable: true })
  image: string | null;
 
  @Column({ default: true })
  is_show: boolean;
 
  @Column({ type: 'integer', nullable: true })
  parent_id: number | null;

  @OneToMany(() => Product, (product: Product) => product.category)
  products: Product[];
}