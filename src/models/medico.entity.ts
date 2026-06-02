import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';
import { EspecialidadeMedico } from '../enums/EspecialidadeMedico.enum.js';

@Entity()
export class Medico {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    utilizador_id!: number;

    @Column({ type: 'simple-enum', enum: EspecialidadeMedico })
    especialidade!: EspecialidadeMedico;

    @Column('text')
    contacto!: string;

    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
