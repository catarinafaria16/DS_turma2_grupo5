import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';

@Entity()
export class Utilizador {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    nome!: string;

    @Column({ unique: true, type: 'text' })
    email!: string;

    @Column('text')
    password!: string;

    @Column({ type: 'simple-enum', enum: PerfilUtilizador })
    perfil!: PerfilUtilizador;

    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
