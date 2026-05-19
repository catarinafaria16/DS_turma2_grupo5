import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity()
export class Utente {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    utilizador_id!: number;

    @Column()
    medico_id!: number;

    @Column({ unique: true })
    nr_utente!: number;

    @Column({ type: 'date' })
    data_nascimento!: Date;

    @Column()
    morada!: string;

    @Column()
    contacto!: string;

    @Column()
    nr_faturacao!: number;

    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
