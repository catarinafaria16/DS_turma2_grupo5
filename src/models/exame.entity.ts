/*
 * ============================================================
 * exame.entity.ts — Tabela de exames clínicos prescritos
 * ============================================================
 *
 * Esta entidade representa um exame clínico incluído numa prescrição.
 * Uma prescrição pode conter vários exames (ex: análises ao sangue, espirometria).
 *
 * O exame só pode ser realizado após o consentimento informado do utente.
 * O estado regista se o exame está pendente, realizado, ou cancelado.
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EstadoExame } from '../enums/EstadoExame.enum.js';

@Entity()
export class Exame {

    // Identificador único do exame (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // ID da prescrição a que este exame pertence
    @Column('int')
    prescricao_id!: number;

    // Tipo/nome do exame a realizar (ex: "Espirometria", "Análises ao sangue", "Teste cutâneo")
    @Column('text')
    tipo_exame!: string;

    // Indica se o utente deu consentimento informado para a realização do exame
    // (true = deu consentimento, false = ainda não deu)
    @Column('boolean')
    consentimento!: boolean;

    // Estado atual do exame: PENDENTE, REALIZADO ou CANCELADO
    @Column({ type: 'simple-enum', enum: EstadoExame })
    estado!: EstadoExame;
}
