import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

@Entity()
export class Auditoria {

    @PrimaryGeneratedColumn()
    log_id!: number;

    @Column()
    utilizador_id!: number;

    @Column()
    tabela!: string;

    @Column()
    tabela_id!: number;

    @Column({ type: 'simple-enum', enum: OperacaoAuditoria })
    operacao!: OperacaoAuditoria;

    @Column({ type: 'simple-json', nullable: true })
    valor_anterior!: object | string | null;

    @Column({ type: 'simple-json', nullable: true })
    valor_novo!: object | string | null;

    @CreateDateColumn()
    timestamp!: Date;
}
