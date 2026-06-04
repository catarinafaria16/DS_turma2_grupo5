/*
 * ============================================================
 * auditoria.entity.ts — Tabela de registo de auditoria (log de atividade)
 * ============================================================
 *
 * Esta entidade guarda um registo de todas as operações importantes realizadas
 * no sistema — quem fez o quê, quando, e quais foram os dados antes e depois.
 *
 * A auditoria é essencial em sistemas clínicos por razões legais e de segurança:
 *   - Rastrear quem alterou um registo médico
 *   - Detetar acessos não autorizados
 *   - Recuperar informação apagada acidentalmente
 *
 * Cada linha desta tabela representa uma ação realizada (criar, atualizar ou apagar).
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { OperacaoAuditoria } from '../enums/OperacaoAuditoria.enum.js';

@Entity()
export class Auditoria {

    // Identificador único do registo de auditoria (gerado automaticamente)
    @PrimaryGeneratedColumn()
    log_id!: number;

    // ID do utilizador que realizou a operação (pode ser null se for uma operação do sistema)
    @Column({ type: 'int', nullable: true })
    utilizador_id!: number | null;

    // Nome da tabela onde a operação foi realizada (ex: "Prescricao", "Utente")
    @Column('text')
    tabela!: string;

    // ID do registo específico que foi afetado na tabela
    @Column('int')
    tabela_id!: number;

    // Tipo de operação realizada: CRIAR, ATUALIZAR ou APAGAR
    @Column({ type: 'simple-enum', enum: OperacaoAuditoria })
    operacao!: OperacaoAuditoria;

    // Estado do registo ANTES da operação (null se for uma criação)
    // Guardado em formato JSON para preservar todos os campos
    @Column({ type: 'simple-json', nullable: true })
    valor_anterior!: object | string | null;

    // Estado do registo DEPOIS da operação (null se for uma eliminação)
    @Column({ type: 'simple-json', nullable: true })
    valor_novo!: object | string | null;

    // @CreateDateColumn: data e hora exatas em que a operação foi registada
    @CreateDateColumn()
    timestamp!: Date;
}
