import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RespostaCarat1a9 } from '../enums/RespostaCarat1a9.enum.js';
import { RespostaCarat10 } from '../enums/RespostaCarat10.enum.js';

@Entity()
export class RespostaCarat {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    avaliacao_id!: number;

    @Column('int')
    utente_id!: number;

    @Column('datetime')
    data_avaliacao!: Date;

    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r1!: RespostaCarat1a9;

    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r2!: RespostaCarat1a9;

    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r3!: RespostaCarat1a9;

    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r4!: RespostaCarat1a9;

    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r5!: RespostaCarat1a9;

    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r6!: RespostaCarat1a9;

    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r7!: RespostaCarat1a9;

    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r8!: RespostaCarat1a9;

    @Column({ type: 'simple-enum', enum: RespostaCarat1a9 })
    r9!: RespostaCarat1a9;

    @Column({ type: 'simple-enum', enum: RespostaCarat10 })
    r10!: RespostaCarat10;

    @Column('int')
    score_total!: number;

    @Column('text')
    interpretacao!: string;

    @Column({ type: 'text' })
    recomendacao_automatica!: string;
}
