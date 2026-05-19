import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IntensidadeSintoma } from '../enums/IntensidadeSintoma.enum.js';

@Entity()
export class Sintoma {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    utente_id!: number;

    @Column()
    descricao!: string;

    @Column({ type: 'simple-enum', enum: IntensidadeSintoma })
    intensidade!: IntensidadeSintoma;

    @Column()
    duracao!: string;

    @CreateDateColumn()
    data_registo!: Date;
}
