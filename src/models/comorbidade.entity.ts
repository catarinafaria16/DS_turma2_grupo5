import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Comorbidade {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    anamnese_id!: number;

    @Column('text')
    descricao!: string;
}
