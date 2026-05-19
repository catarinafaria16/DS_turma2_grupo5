import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MedicacaoHabitual {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    anamnese_id!: number;

    @Column()
    nome!: string;

    @Column()
    dose!: string;

    @Column()
    duracao!: string;

    @Column()
    periodicidade!: string;
}
