import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Tabagismo } from '../enums/Tabagismo.enum.js';
import { SexoAnamnese } from '../enums/SexoAnamnese.enum.js';

@Entity()
export class Anamnese {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    utente_id!: number;

    @Column({ type: 'text' })
    historico_familiar!: string;

    @Column({ type: 'simple-enum', enum: Tabagismo })
    tabagismo!: Tabagismo;

    @Column({ type: 'simple-enum', enum: SexoAnamnese, nullable: true })
    sexo?: SexoAnamnese;
}
