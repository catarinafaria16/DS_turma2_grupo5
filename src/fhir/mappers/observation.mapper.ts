/*
 * ============================================================
 * observation.mapper.ts — Conversor de Sintoma para FHIR Observation
 * ============================================================
 *
 * Este mapper tem duas funções:
 *
 * 1. mapToObservation: converte um Sintoma interno para FHIR Observation
 *    Usado para representar sintomas clínicos no formato FHIR.
 *    O valor da observação inclui a intensidade e duração do sintoma.
 *
 * 2. mapToExternalObservation: passa-through de observações externas já em formato FHIR
 *    Usado para integrar dados de sistemas externos (ex: laboratórios).
 *    O recurso já vem no formato correto e é apenas "embrulhado" no tipo correto.
 */
import { Sintoma } from '../../models/sintoma.entity.js';
import type { FhirObservationDto } from '../../dtos/fhir/observation/observationDTO.js';

// Passa-through de observações externas já em formato FHIR
export function mapToExternalObservation(resource: any): FhirObservationDto {
    return {
        resourceType: 'Observation',
        id: resource.id,
        status: resource.status,
        code: resource.code ?? { coding: [] },
        subject: resource.subject ?? { reference: '' },
        effectiveDateTime: resource.effectiveDateTime,
        valueQuantity: resource.valueQuantity,
        valueString: resource.valueString,
        valueCodeableConcept: resource.valueCodeableConcept,
    };
}

export function mapToObservation(sintoma: Sintoma): FhirObservationDto {
    return {
        resourceType: 'Observation',
        id: String(sintoma.id),
        status: 'final',
        code: { text: sintoma.descricao },
        subject: { reference: `Patient/${sintoma.utente_id}` },
        effectiveDateTime: new Date(sintoma.data_registo).toISOString(),
        valueCodeableConcept: { text: `${sintoma.intensidade} — duração: ${sintoma.duracao}` },
    };
}
