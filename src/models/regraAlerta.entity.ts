import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { CategoriaRegraAlerta } from '../enums/CategoriaRegraAlerta.enum.js';
import { PrioridadeRegraAlerta } from '../enums/PrioridadeRegraAlerta.enum.js';

@Entity()
export class RegraAlerta {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    medico_id!: number;

    @Column()
    administrador_id!: number;

    @Column({ type: 'simple-enum', enum: CategoriaRegraAlerta })
    categoria!: CategoriaRegraAlerta;

    @Column()
    limiar_score!: number;

    @Column()
    valor_deterioracao!: number;

    @Column({ type: 'simple-enum', enum: PrioridadeRegraAlerta })
    prioridade!: PrioridadeRegraAlerta;

    @CreateDateColumn()
    data_criacao!: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
