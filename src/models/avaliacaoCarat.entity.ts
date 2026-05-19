import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class AvaliacaoCarat {

    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn()
    data_criacao!: Date;

    @Column()
    q1!: string;

    @Column()
    q2!: string;

    @Column()
    q3!: string;

    @Column()
    q4!: string;

    @Column()
    q5!: string;

    @Column()
    q6!: string;

    @Column()
    q7!: string;

    @Column()
    q8!: string;

    @Column()
    q9!: string;

    @Column()
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

    @Column()
    versao!: number;
}
