/*
 * ============================================================
 * medico.entity.ts — Tabela de médicos do sistema
 * ============================================================
 *
 * Esta entidade guarda os dados específicos de um médico.
 * Um médico é sempre também um Utilizador — por isso esta tabela
 * complementa a tabela Utilizador com informações clínicas adicionais.
 *
 * Relação: cada Médico está ligado a um Utilizador através de utilizador_id.
 * Para fazer login, o médico usa o número de cédula médica (não o ID interno).
 */
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';
import { EspecialidadeMedico } from '../enums/EspecialidadeMedico.enum.js';

@Entity()
export class Medico {

    // Identificador único interno do médico (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // Ligação à tabela Utilizador — o ID do registo correspondente em Utilizador
    // Através deste campo é possível obter o nome, email e password do médico
    @Column('int')
    utilizador_id!: number;

    // Número de cédula médica — identificador oficial da Ordem dos Médicos
    // É também usado como identificador de login
    @Column('int')
    numero_cedula_medica!: number;

    // Especialidade clínica do médico (ex: ALERGOLOGIA, PNEUMOLOGIA)
    @Column({ type: 'simple-enum', enum: EspecialidadeMedico })
    especialidade!: EspecialidadeMedico;

    // Contacto telefónico do médico
    @Column('text')
    contacto!: string;

    // Data de eliminação lógica — o registo não é apagado, apenas marcado como inativo
    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
