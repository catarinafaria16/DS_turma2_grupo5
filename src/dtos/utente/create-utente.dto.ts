/*
 * CreateUtenteDto — Dados necessários para criar um novo utente
 *
 * DTO (Data Transfer Object) é um "molde" que define exatamente quais campos
 * devem ser enviados no corpo do pedido HTTP POST /api/utentes.
 *
 * TypeScript usa esta interface para validar os tipos dos dados recebidos.
 * O service valida o conteúdo (ex: se o médico existe, se o nr_utente é único).
 */
export interface CreateUtenteDto {
    utilizador_id: number;    // ID do utilizador associado (deve ter perfil UTENTE)
    medico_id: number;        // ID do médico responsável pelo acompanhamento
    nr_utente: number;        // Número de utente do SNS (deve ser único no sistema)
    data_nascimento: Date;    // Data de nascimento (não pode ser no futuro)
    morada: string;           // Morada/endereço completo do utente
    contacto: string;         // Número de telefone português (ex: +351912345678)
    nr_faturacao: number;     // Número de faturação para efeitos administrativos
}