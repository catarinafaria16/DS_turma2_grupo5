/*
 * CreateAlergiaDto — Dados necessários para registar uma alergia de um utente
 *
 * As alergias são registadas dentro da anamnese do utente.
 * Cada alergia descreve o tipo de alergia, com que frequência ocorrem crises
 * e qual a sua gravidade.
 */
import { IntensidadeCriseAlergia } from '../../enums/IntensidadeCriseAlergia.enum.js';

export interface CreateAlergiaDto {
    anamnese_id: number;                        // ID da anamnese do utente a que pertence
    descricao: string;                           // Descrição da alergia (ex: "Alergia a ácaros do pó doméstico")
    frequencia_crise: string;                    // Com que frequência ocorrem crises (ex: "Sazonal", "Perene")
    intensidade_crise: IntensidadeCriseAlergia; // Gravidade: LEVE, MODERADA ou GRAVE
}
