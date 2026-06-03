import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EstadoExame } from '../enums/EstadoExame.enum.js';

@Entity()
export class Exame {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    prescricao_id!: number;

    @Column('text')
    tipo_exame!: string;


    @Column('boolean')
    consentimento!: boolean;

    @Column({ type: 'simple-enum', enum: EstadoExame })
    estado!: EstadoExame;
}
