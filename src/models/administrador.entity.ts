import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity()
export class Administrador {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    utilizador_id!: number;

    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
