import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, length: 30})
    email: string;

    @Column({type: 'varchar', length: 100})
    password_hash: string;

    @Column({nullable: false, length: 50})
    fullname: string;

    @Column({default: false})
    is_block: boolean;
}
