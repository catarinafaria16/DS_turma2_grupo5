/*
 * MedicacaoHabitualResponseDto — Dados de medicação habitual devolvidos pela API
 *
 * Estrutura da medicação habitual nas respostas GET /api/medicacoes-habituais.
 * Ligada à anamnese do utente (e por sua vez ao utente).
 */
export interface MedicacaoHabitualResponseDto {
    id: number;              // ID único desta medicação habitual
    anamnese_id: number;     // ID da anamnese do utente
    nome: string;            // Nome do medicamento
    dose: string;            // Dose habitual (ex: "10 mg")
    duracao: string;         // Duração (ex: "Crónico", "3 meses")
    periodicidade: string;   // Frequência (ex: "1x por dia ao jantar")
}