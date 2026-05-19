import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Medicacao {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    prescricao_id!: number;

    @Column()
    nome!: string;

    @Column()
    dose!: string;

    @Column()
    duracao!: string;

    @Column()
    periodicidade!: string;

    @Column({ type: 'date' })
    validade!: Date;
}
