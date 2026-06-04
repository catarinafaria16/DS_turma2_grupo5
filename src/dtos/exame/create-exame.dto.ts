/*
 * CreateExameDto — Dados necessários para adicionar um exame a uma prescrição
 *
 * Um exame só pode ser realizado após o consentimento informado do utente.
 * O estado inicial é normalmente PENDENTE.
 *
 * Exemplos de tipo_exame: "Espirometria", "Análises ao sangue", "Teste cutâneo de alergias"
 */
import { EstadoExame } from '../../enums/EstadoExame.enum.js';

export interface CreateExameDto {
    prescricao_id: number;   // ID da prescrição a que este exame pertence
    tipo_exame: string;      // Descrição do tipo de exame a realizar
    consentimento: boolean;  // true = utente deu consentimento; false = ainda não
    estado: EstadoExame;     // Estado: PENDENTE, REALIZADO, ANALISADO ou CANCELADO
}