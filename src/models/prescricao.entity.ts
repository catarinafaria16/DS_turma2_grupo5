/*
 * ============================================================
 * prescricao.entity.ts — Tabela de prescrições médicas
 * ============================================================
 *
 * Esta entidade representa uma prescrição médica — o documento emitido
 * pelo médico que autoriza o utente a levantar medicamentos ou realizar exames.
 *
 * Uma prescrição pode ser:
 *   - De medicamentos (MEDICACAO): contém uma lista de medicações associadas
 *   - De exames (EXAME): contém uma lista de exames a realizar
 *
 * O estado da prescrição indica se ainda está ativa ou foi utilizada/expirada.
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { TipoPrescricao } from '../enums/TipoPrescricao.enum.js';
import { EstadoPrescricao } from '../enums/EstadoPrescricao.enum.js';

@Entity()
export class Prescricao {

    // Identificador único da prescrição (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // ID do médico que emitiu a prescrição
    @Column('int')
    medico_id!: number;

    // ID do utente para quem foi emitida a prescrição
    @Column('int')
    utente_id!: number;

    // Tipo de prescrição: MEDICACAO ou EXAME
    @Column({ type: 'simple-enum', enum: TipoPrescricao })
    tipo!: TipoPrescricao;

    // @CreateDateColumn: data preenchida automaticamente com o momento em que a prescrição foi criada
    @CreateDateColumn()
    data_emissao!: Date;

    // Data até à qual a prescrição é válida — após esta data, não pode ser utilizada
    @Column({ type: 'date' })
    data_validade!: Date;

    // Estado da prescrição: ATIVA, UTILIZADA, EXPIRADA, etc.
    @Column({ type: 'simple-enum', enum: EstadoPrescricao })
    estado!: EstadoPrescricao;
}
