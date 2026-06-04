/*
 * MedicoResponseDto — Dados do médico devolvidos pela API
 *
 * Estrutura dos dados do médico nas respostas GET /api/medicos.
 * Não inclui a password (que fica na tabela Utilizador e nunca é exposta na API).
 */
export interface MedicoResponseDto {
    id: number;                     // ID interno do médico
    utilizador_id: number;          // ID do utilizador associado
    numero_cedula_medica: number;   // Número de cédula da Ordem dos Médicos
    especialidade: string;          // Especialidade médica
    contacto: string;               // Contacto telefónico
    deleted_at?: Date;              // Data de eliminação lógica (null = ativo)
}
