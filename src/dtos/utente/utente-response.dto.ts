/*
 * UtenteResponseDto — Dados do utente devolvidos pela API
 *
 * Este DTO define a estrutura dos dados do utente que a API devolve
 * nas respostas a pedidos GET /api/utentes.
 *
 * Inclui o campo deleted_at que indica se o utente foi apagado logicamente.
 * Se deleted_at tiver valor, o utente foi "apagado" mas o registo existe.
 */
export interface UtenteResponseDto {
    id: number;               // ID único interno do utente
    utilizador_id: number;    // ID do utilizador associado
    medico_id: number;        // ID do médico responsável
    nr_utente: number;        // Número de utente do SNS
    data_nascimento: Date;    // Data de nascimento
    morada: string;           // Morada completa
    contacto: string;         // Número de telefone
    nr_faturacao: number;     // Número de faturação
    deleted_at?: Date;        // Data de eliminação lógica (null = utente ativo)
}