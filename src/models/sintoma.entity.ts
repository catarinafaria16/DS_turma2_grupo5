import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IntensidadeSintoma } from '../enums/IntensidadeSintoma.enum.js';

@Entity()
export class Sintoma {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    utente_id!: number;

    @Column('text')
    descricao!: string;

    @Column({ type: 'simple-enum', enum: IntensidadeSintoma })
    intensidade!: IntensidadeSintoma;

    @Column('text')
    duracao!: string;

    @CreateDateColumn()
    data_registo!: Date;
}
