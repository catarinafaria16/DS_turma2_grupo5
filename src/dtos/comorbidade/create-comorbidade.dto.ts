/*
 * CreateComorbidadeDto — Dados necessários para registar uma comorbilidade
 *
 * As comorbilidades são outras doenças coexistentes com a rinite/asma.
 * Estão associadas à anamnese do utente.
 * Um utente pode ter várias comorbilidades registadas.
 */
export interface CreateComorbidadeDto {
    anamnese_id: number;  // ID da anamnese do utente (e por sua vez, do utente)
    descricao: string;    // Descrição da comorbilidade (ex: "Dermatite atópica desde os 5 anos")
}