import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity()
export class Utente {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    utilizador_id!: number;

    @Column('int')
    medico_id!: number;

    @Column({ unique: true, type: 'int' })
    nr_utente!: number;

    @Column({ type: 'date' })
    data_nascimento!: Date;

    @Column('text')
    morada!: string;

    @Column('text')
    contacto!: string;

    @Column('int')
    nr_faturacao!: number;

    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
