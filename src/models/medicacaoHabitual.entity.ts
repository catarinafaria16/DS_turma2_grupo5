/*
 * ============================================================
 * medicacaoHabitual.entity.ts — Tabela de medicação habitual do utente
 * ============================================================
 *
 * Esta entidade regista os medicamentos que o utente toma regularmente,
 * de forma crónica ou habitual — ao contrário das medicações prescritas
 * pontualmente (que estão na tabela Medicacao).
 *
 * É importante para o médico conhecer toda a medicação do utente,
 * para evitar interações medicamentosas e adaptar o tratamento.
 *
 * Exemplos: "Antihipertensor diário", "Insulina", "Vitamina D"
 *
 * Está ligada à anamnese do utente. Um utente pode ter vários medicamentos habituais.
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MedicacaoHabitual {

    // Identificador único deste registo de medicação habitual (gerado automaticamente)
    @PrimaryGeneratedColumn()
    id!: number;

    // ID da anamnese a que esta medicação pertence (e por sua vez, do utente)
    @Column('int')
    anamnese_id!: number;

    // Nome do medicamento que o utente toma habitualmente
    @Column('text')
    nome!: string;

    // Dose em cada administração (ex: "1 comprimido de 10mg")
    @Column('text')
    dose!: string;

    // Há quanto tempo toma este medicamento ou por quanto tempo deve tomar
    @Column('text')
    duracao!: string;

    // Com que frequência toma o medicamento (ex: "1x por dia ao jantar")
    @Column('text')
    periodicidade!: string;
}
