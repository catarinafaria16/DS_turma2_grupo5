/*
 * ============================================================
 * medicacao.entity.ts — Tabela de medicamentos prescritos
 * ============================================================
 *
 * Esta entidade representa um medicamento específico incluído numa prescrição.
 * Uma prescrição pode ter vários medicamentos — por isso existe esta tabela separada.
 *
 * Exemplo: uma prescrição pode incluir:
 *   - Cetirizina 10mg, 1 comprimido por dia, durante 30 dias
 *   - Budesonida spray, 2 inalações por dia, durante 60 dias
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Medicacao {

    // Identificador único deste medicamento (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // ID da prescrição a que este medicamento pertence
    @Column('int')
    prescricao_id!: number;

    // Nome do medicamento (ex: "Cetirizina 10mg", "Budesonida 200mcg")
    @Column('text')
    nome!: string;

    // Dose a tomar em cada administração (ex: "1 comprimido", "2 inalações")
    @Column('text')
    dose!: string;

    // Duração do tratamento (ex: "30 dias", "3 meses")
    @Column('text')
    duracao!: string;

    // Com que frequência deve ser tomado (ex: "1x por dia", "de 8 em 8 horas")
    @Column('text')
    periodicidade!: string;

}
