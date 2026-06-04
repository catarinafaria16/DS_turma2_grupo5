/*
 * ============================================================
 * utente.entity.ts — Tabela de utentes (pacientes) do sistema
 * ============================================================
 *
 * Esta entidade guarda os dados clínicos e pessoais de um utente (paciente).
 * Um utente é sempre também um Utilizador — por isso esta tabela
 * complementa a tabela Utilizador com informações clínicas adicionais.
 *
 * Relações:
 *   - Cada Utente está ligado a um Utilizador (utilizador_id)
 *   - Cada Utente está atribuído a um Médico responsável (medico_id)
 */
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity()
export class Utente {

    // Identificador único interno do utente (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // Ligação à tabela Utilizador — para obter nome, email e password
    @Column('int')
    utilizador_id!: number;

    // ID do médico responsável pelo acompanhamento deste utente
    @Column('int')
    medico_id!: number;

    // Número de utente do SNS (Serviço Nacional de Saúde) — único por utente
    @Column({ unique: true, type: 'int' })
    nr_utente!: number;

    // Data de nascimento do utente (relevante para cálculos de idade e triagem)
    @Column({ type: 'date' })
    data_nascimento!: Date;

    // Morada/endereço do utente
    @Column('text')
    morada!: string;

    // Contacto telefónico do utente
    @Column('text')
    contacto!: string;

    // Número de faturação para efeitos administrativos e de faturação clínica
    @Column('int')
    nr_faturacao!: number;

    // Data de eliminação lógica — o utente não é apagado, apenas marcado como inativo
    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
