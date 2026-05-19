import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EstadoExame } from '../enums/EstadoExame.enum.js';

@Entity()
export class Exame {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    prescricao_id!: number;

    @Column()
    tipo_exame!: string;

    @Column({ type: 'timestamp' })
    data!: Date;

    @Column({ type: 'simple-json' })
    resultado!: object;

    @Column()
    consentimento!: boolean;

    @Column({ type: 'simple-enum', enum: EstadoExame })
    estado!: EstadoExame;
}
