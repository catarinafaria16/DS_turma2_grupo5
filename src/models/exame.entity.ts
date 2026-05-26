import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EstadoExame } from '../enums/EstadoExame.enum.js';
import { TipoExame } from '../enums/TipoExame.enum.js';

@Entity()
export class Exame {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    prescricao_id!: number;

    @Column({ type: 'simple-enum', enum: TipoExame })
    tipo_exame!: TipoExame;

    @Column({ type: 'datetime' })
    data!: Date;

    @Column('boolean')
    consentimento!: boolean;

    @Column({ type: 'simple-enum', enum: EstadoExame })
    estado!: EstadoExame;
}
