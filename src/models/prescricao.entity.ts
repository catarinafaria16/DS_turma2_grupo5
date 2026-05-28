import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { TipoPrescricao } from '../enums/TipoPrescricao.enum.js';
import { EstadoPrescricao } from '../enums/EstadoPrescricao.enum.js';

@Entity()
export class Prescricao {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    medico_id!: number;

    @Column('int')
    utente_id!: number;

    @Column({ type: 'simple-enum', enum: TipoPrescricao })
    tipo!: TipoPrescricao;

    @CreateDateColumn()
    data_emissao!: Date;

    @Column({ type: 'date' })
    data_validade!: Date;

    @Column({ type: 'simple-enum', enum: EstadoPrescricao })
    estado!: EstadoPrescricao;
}
