import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IntensidadeCriseAlergia } from '../enums/IntensidadeCriseAlergia.enum.js';

@Entity()
export class Alergia {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    anamnese_id!: number;

    @Column()
    descricao!: string;

    @Column()
    frequencia_crise!: string;

    @Column({ type: 'simple-enum', enum: IntensidadeCriseAlergia })
    intensidade_crise!: IntensidadeCriseAlergia;
}
