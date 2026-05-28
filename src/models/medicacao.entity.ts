import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Medicacao {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    prescricao_id!: number;

    @Column('text')
    nome!: string;

    @Column('text')
    dose!: string;

    @Column('text')
    duracao!: string;

    @Column('text')
    periodicidade!: string;

}
