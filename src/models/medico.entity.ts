import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity()
export class Medico {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    utilizador_id!: number;

    @Column()
    especialidade!: string;

    @Column()
    contacto!: string;

    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
