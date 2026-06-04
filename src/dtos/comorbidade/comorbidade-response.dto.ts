/*
 * ComorbidadeResponseDto — Dados de uma comorbilidade devolvidos pela API
 *
 * Estrutura simples com o ID, a anamnese associada e a descrição.
 */
export interface ComorbidadeResponseDto {
    id: number;           // ID único da comorbilidade
    anamnese_id: number;  // ID da anamnese do utente
    descricao: string;    // Descrição da comorbilidade (ex: "Dermatite atópica")
}