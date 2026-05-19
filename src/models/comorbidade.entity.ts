import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Comorbidade {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    anamnese_id!: number;

    @Column()
    descricao!: string;
}
