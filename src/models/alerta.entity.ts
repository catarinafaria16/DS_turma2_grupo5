import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { TipoAlerta } from '../enums/TipoAlerta.enum.js';
import { EstadoAlerta } from '../enums/EstadoAlerta.enum.js';
import { PrioridadeRegraAlerta } from '../enums/PrioridadeRegraAlerta.enum.js';

@Entity()
export class Alerta {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    utente_id!: number;

    @Column('int')
    medico_id!: number;

    @Column({ type: 'int', nullable: true })
    regra_id?: number;

    @Column({ type: 'simple-enum', enum: TipoAlerta })
    tipo!: TipoAlerta;

    @Column({ type: 'simple-enum', enum: EstadoAlerta })
    estado!: EstadoAlerta;

    @Column({ type: 'simple-enum', enum: PrioridadeRegraAlerta })
    prioridade!: PrioridadeRegraAlerta;

    @Column({ type: 'text', nullable: true })
    notas?: string;

    @CreateDateColumn()
    data_criacao!: Date;

    @Column({ type: 'datetime' })
    data_atualizacao_estado!: Date;
}
