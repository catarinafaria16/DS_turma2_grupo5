/*
 * MedicacaoResponseDto — Dados de um medicamento prescrito devolvidos pela API
 *
 * Estrutura dos medicamentos nas respostas GET /api/medicacoes.
 */
export interface MedicacaoResponseDto {
    id: number;              // ID único do medicamento prescrito
    prescricao_id: number;   // ID da prescrição a que pertence
    nome: string;            // Nome do medicamento
    dose: string;            // Dose por administração (ex: "500 mg")
    duracao: string;         // Duração do tratamento (ex: "30 dias")
    periodicidade: string;   // Frequência de administração (ex: "1x por dia")
}