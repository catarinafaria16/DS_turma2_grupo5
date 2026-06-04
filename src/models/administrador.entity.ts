/*
 * ============================================================
 * administrador.entity.ts — Tabela de administradores do sistema
 * ============================================================
 *
 * Esta entidade representa os administradores do sistema.
 * Os administradores têm acesso total: podem criar/editar/apagar
 * médicos, utentes e outros dados do sistema.
 *
 * A tabela Administrador é simples — apenas guarda a ligação ao Utilizador,
 * pois todos os dados pessoais (nome, email, etc.) estão na tabela Utilizador.
 */
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

@Entity()
export class Administrador {

    // Identificador único interno do administrador (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // Ligação à tabela Utilizador — para obter o nome, email e password do administrador
    @Column('int')
    utilizador_id!: number;

    // Data de eliminação lógica — o registo não é apagado, apenas marcado como inativo
    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;
}
