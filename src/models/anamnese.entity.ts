/*
 * ============================================================
 * anamnese.entity.ts — Tabela de anamnese (história clínica) do utente
 * ============================================================
 *
 * A anamnese é o registo da história clínica do utente — informações de fundo
 * essenciais para o diagnóstico e acompanhamento médico.
 *
 * Inclui dados como:
 *   - Histórico familiar de doenças (ex: asma hereditária)
 *   - Hábitos tabágicos (fumador, ex-fumador, não fumador)
 *   - Sexo biológico (relevante para diagnóstico de rinite e asma)
 *
 * Cada utente tem uma única anamnese associada.
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Tabagismo } from '../enums/Tabagismo.enum.js';
import { SexoAnamnese } from '../enums/SexoAnamnese.enum.js';

@Entity()
export class Anamnese {

    // Identificador único da anamnese (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // ID do utente a quem esta anamnese pertence
    @Column('int')
    utente_id!: number;

    // Histórico familiar de doenças relevantes (texto livre)
    // Ex: "Pai asmático, mãe com rinite alérgica"
    @Column({ type: 'text' })
    historico_familiar!: string;

    // Situação tabágica do utente: FUMADOR, EX_FUMADOR ou NAO_FUMADOR
    // O tabagismo é um fator de risco importante para doenças respiratórias
    @Column({ type: 'simple-enum', enum: Tabagismo })
    tabagismo!: Tabagismo;

    // Sexo biológico do utente — relevante para análise clínica da doença
    @Column({ type: 'simple-enum', enum: SexoAnamnese })
    sexo!: SexoAnamnese;
}
