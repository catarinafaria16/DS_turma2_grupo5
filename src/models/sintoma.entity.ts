/*
 * ============================================================
 * sintoma.entity.ts — Tabela de sintomas reportados pelo utente
 * ============================================================
 *
 * Esta entidade regista sintomas que o utente reporta ao médico durante
 * a consulta ou acompanhamento. Os sintomas são importantes para avaliar
 * a evolução da doença e ajustar o tratamento.
 *
 * Exemplos: "Rinorreia (corrimento nasal)", "Pieira", "Falta de ar ao esforço"
 */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IntensidadeSintoma } from '../enums/IntensidadeSintoma.enum.js';

@Entity()
export class Sintoma {

    // Identificador único do registo de sintoma (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // ID do utente que reportou este sintoma
    @Column('int')
    utente_id!: number;

    // Descrição do sintoma em texto livre (ex: "Comichão nos olhos e nariz")
    @Column('text')
    descricao!: string;

    // Intensidade/gravidade do sintoma: LIGEIRO, MODERADO ou GRAVE
    @Column({ type: 'simple-enum', enum: IntensidadeSintoma })
    intensidade!: IntensidadeSintoma;

    // Quanto tempo o sintoma dura ou há quanto tempo está presente (ex: "3 dias", "2 semanas")
    @Column('text')
    duracao!: string;

    // @CreateDateColumn: data e hora registadas automaticamente quando o sintoma é inserido no sistema
    @CreateDateColumn()
    data_registo!: Date;
}
