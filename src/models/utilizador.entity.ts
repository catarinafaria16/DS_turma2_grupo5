/*
 * ============================================================
 * utilizador.entity.ts — Tabela base de utilizadores do sistema
 * ============================================================
 *
 * Esta entidade representa qualquer pessoa que possa fazer login no sistema.
 * Existem três tipos de utilizadores (perfis):
 *   - ADMIN: administrador do sistema
 *   - MEDICO: médico que acompanha utentes
 *   - UTENTE: paciente/doente
 *
 * Nota: Médicos e utentes têm tabelas próprias (medico.entity e utente.entity)
 * com dados adicionais. Esta tabela guarda apenas os dados de autenticação comuns.
 *
 * Em TypeORM, "@Entity()" transforma esta classe numa tabela da base de dados,
 * e cada "@Column" define uma coluna dessa tabela.
 */
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';
import { PerfilUtilizador } from '../enums/PerfilUtilizador.enum.js';
import { GeneroUtilizador } from '../enums/GeneroUtilizador.enum.js';

// @Entity() diz ao TypeORM que esta classe é uma tabela na base de dados
@Entity()
export class Utilizador {

    // @PrimaryGeneratedColumn: identificador único gerado automaticamente (1, 2, 3, ...)
    // É como o "número de bilhete de identidade" do utilizador dentro do sistema
    @PrimaryGeneratedColumn()
    id!: number;

    // Nome completo do utilizador
    @Column('text')
    nome!: string;

    // Email único — não podem existir dois utilizadores com o mesmo email
    @Column({ unique: true, type: 'text' })
    email!: string;

    // Password de acesso (em texto simples — numa aplicação de produção deveria ser encriptada)
    @Column('text')
    password!: string;

    // Perfil/tipo do utilizador: define o que pode fazer no sistema
    // Valores possíveis: ADMIN, MEDICO, UTENTE (definidos no enum PerfilUtilizador)
    @Column({ type: 'simple-enum', enum: PerfilUtilizador })
    perfil!: PerfilUtilizador;

    // Género do utilizador (ex: MASCULINO, FEMININO)
    @Column({ type: 'simple-enum', enum: GeneroUtilizador })
    genero!: GeneroUtilizador;

    // Data de eliminação lógica ("soft delete") — quando um utilizador é "apagado",
    // esta data é preenchida mas o registo não é removido da base de dados.
    // Isto permite recuperar dados e manter histórico.
    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
