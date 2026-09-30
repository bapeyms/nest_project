import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "../category/category.entity.js";

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ unique: true })
    slug: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: true })
    category_id: number;

    @ManyToOne(() => Category, (category: Category) => category.products, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'category_id' })
    category: Category;
}