import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IntensidadeCriseAlergia } from '../enums/IntensidadeCriseAlergia.enum.js';

@Entity()
export class Alergia {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    anamnese_id!: number;

    @Column('text')
    descricao!: string;

    @Column('text')
    frequencia_crise!: string;

    @Column({ type: 'simple-enum', enum: IntensidadeCriseAlergia })
    intensidade_crise!: IntensidadeCriseAlergia;
}
