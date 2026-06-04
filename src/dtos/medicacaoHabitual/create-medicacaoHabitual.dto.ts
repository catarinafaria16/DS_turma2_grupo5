/*
 * CreateMedicacaoHabitualDto — Dados necessários para registar medicação habitual de um utente
 *
 * A medicação habitual é diferente da medicação prescrita pontualmente:
 * são medicamentos que o utente toma regularmente de forma crónica.
 *
 * Está associada à anamnese do utente.
 * Pode ser criada manualmente ou automaticamente quando se prescrevem medicamentos.
 */
export interface CreateMedicacaoHabitualDto {
    anamnese_id: number;  // ID da anamnese do utente
    nome: string;         // Nome do medicamento (ex: "Cetirizina 10mg")
    dose: string;         // Dose habitual (ex: "1 comprimido", "10 mg")
    duracao: string;      // Por quanto tempo toma (ex: "Crónico", "3 meses")
    periodicidade: string; // Com que frequência (ex: "1x por dia ao jantar")
}