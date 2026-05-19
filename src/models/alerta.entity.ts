import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { TipoAlerta } from '../enums/TipoAlerta.enum.js';
import { EstadoAlerta } from '../enums/EstadoAlerta.enum.js';
import { PrioridadeRegraAlerta } from '../enums/PrioridadeRegraAlerta.enum.js';

@Entity()
export class Alerta {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    utente_id!: number;

    @Column()
    medico_id!: number;

    @Column()
    regra_id!: number;

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

    @Column({ type: 'timestamp' })
    data_atualizacao_estado!: Date;
}
