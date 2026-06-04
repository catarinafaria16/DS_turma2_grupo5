/*
 * ============================================================
 * comorbidade.entity.ts — Tabela de comorbilidades do utente
 * ============================================================
 *
 * Esta entidade regista as comorbilidades — outras doenças que o utente
 * tem para além da rinite/asma. São relevantes porque podem influenciar
 * o diagnóstico, tratamento e controlo das doenças alérgicas respiratórias.
 *
 * Exemplos de comorbilidades comuns em doentes com rinite/asma:
 *   - Dermatite atópica (eczema)
 *   - Conjuntivite alérgica
 *   - Apneia do sono
 *   - Refluxo gastroesofágico
 *
 * Está ligada à anamnese do utente. Um utente pode ter várias comorbilidades.
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Comorbidade {

    // Identificador único desta comorbilidade (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // ID da anamnese a que esta comorbilidade pertence (e por sua vez, do utente)
    @Column('int')
    anamnese_id!: number;

    // Descrição da comorbilidade em texto livre (ex: "Dermatite atópica desde os 5 anos")
    @Column('text')
    descricao!: string;
}
