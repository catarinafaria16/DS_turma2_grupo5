import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { CategoriaRegraAlerta } from '../enums/CategoriaRegraAlerta.enum.js';
import { PrioridadeRegraAlerta } from '../enums/PrioridadeRegraAlerta.enum.js';

@Entity()
export class RegraAlerta {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int', nullable: true })
    medico_id?: number;

    @Column({ type: 'int', nullable: true })
    administrador_id?: number;

    @Column({ type: 'int', nullable: true })
    utente_id?: number;

    @Column({ type: 'simple-enum', enum: CategoriaRegraAlerta })
    categoria!: CategoriaRegraAlerta;

    @Column({ type: 'int', nullable: true })
    limiar_score?: number;

    @Column({ type: 'int', nullable: true })
    valor_deterioracao?: number;

    @Column({ type: 'simple-enum', enum: PrioridadeRegraAlerta })
    prioridade!: PrioridadeRegraAlerta;

    @CreateDateColumn()
    data_criacao!: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
