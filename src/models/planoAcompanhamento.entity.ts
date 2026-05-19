import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EstadoPlanoAcompanhamento } from '../enums/EstadoPlanoAcompanhamento.enum.js';

@Entity()
export class PlanoAcompanhamento {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    medico_id!: number;

    @Column()
    utente_id!: number;

    @Column()
    frequencia_avaliacao!: string;

    @Column({ type: 'date' })
    data_inicio!: Date;

    @Column({ type: 'date' })
    data_fim!: Date;

    @Column({ type: 'simple-enum', enum: EstadoPlanoAcompanhamento })
    estado!: EstadoPlanoAcompanhamento;

    @Column({ type: 'text' })
    recomendacao_medica!: string;
}
