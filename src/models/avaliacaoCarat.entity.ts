import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class AvaliacaoCarat {

    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    data_criacao!: Date;

    @Column('text')
    q1!: string;

    @Column('text')
    q2!: string;

    @Column('text')
    q3!: string;

    @Column('text')
    q4!: string;

    @Column('text')
    q5!: string;

    @Column('text')
    q6!: string;

    @Column('text')
    q7!: string;

    @Column('text')
    q8!: string;

    @Column('text')
    q9!: string;

    @Column('text')
    q10!: string;

    @Column({ type: 'simple-json' })
    r1!: object;

    @Column({ type: 'simple-json' })
    r2!: object;

    @Column({ type: 'simple-json' })
    r3!: object;

    @Column({ type: 'simple-json' })
    r4!: object;

    @Column({ type: 'simple-json' })
    r5!: object;

    @Column({ type: 'simple-json' })
    r6!: object;

    @Column({ type: 'simple-json' })
    r7!: object;

    @Column({ type: 'simple-json' })
    r8!: object;

    @Column({ type: 'simple-json' })
    r9!: object;

    @Column({ type: 'simple-json' })
    r10!: object;

    @Column('int')
    versao!: number;
}
