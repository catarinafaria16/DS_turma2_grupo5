/*
 * CreateSintomaDto — Dados necessários para registar um sintoma de um utente
 *
 * Os sintomas são reportados pelo utente ou registados pelo médico durante consulta.
 * São importantes para acompanhar a evolução da doença entre avaliações CARAT.
 *
 * Exemplos de descricao: "Pieira ao acordar", "Corrimento nasal constante", "Olhos pruriginosos"
 */
import { IntensidadeSintoma } from '../../enums/IntensidadeSintoma.enum.js';

export interface CreateSintomaDto {
    utente_id: number;             // ID do utente que tem este sintoma
    descricao: string;             // Descrição do sintoma em texto livre
    intensidade: IntensidadeSintoma; // Gravidade: LIGEIRA, MODERADA ou GRAVE
    duracao: string;               // Há quanto tempo tem o sintoma (ex: "3 dias", "2 semanas")
    data_registo: Date;            // Data em que o sintoma foi registado
}