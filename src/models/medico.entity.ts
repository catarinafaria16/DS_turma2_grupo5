import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity()
export class Medico {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    utilizador_id!: number;

    @Column('text')
    especialidade!: string;

    @Column('text')
    contacto!: string;

    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
