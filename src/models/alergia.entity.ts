/*
 * ============================================================
 * alergia.entity.ts — Tabela de alergias do utente
 * ============================================================
 *
 * Esta entidade regista as alergias conhecidas de um utente.
 * Está ligada à anamnese do utente (história clínica).
 *
 * Um utente pode ter várias alergias registadas (ex: ácaros, pólen, medicamentos).
 * Para cada alergia, regista-se a descrição, a frequência das crises e a sua intensidade.
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IntensidadeCriseAlergia } from '../enums/IntensidadeCriseAlergia.enum.js';

@Entity()
export class Alergia {

    // Identificador único da alergia (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // ID da anamnese a que esta alergia pertence (que por sua vez pertence a um utente)
    @Column('int')
    anamnese_id!: number;

    // Descrição da alergia em texto livre (ex: "Alergia a ácaros do pó doméstico")
    @Column('text')
    descricao!: string;

    // Com que frequência ocorrem as crises alérgicas (ex: "Sazonal", "Perene", "Ocasional")
    @Column('text')
    frequencia_crise!: string;

    // Gravidade da crise alérgica: LIGEIRA, MODERADA ou GRAVE
    @Column({ type: 'simple-enum', enum: IntensidadeCriseAlergia })
    intensidade_crise!: IntensidadeCriseAlergia;
}
