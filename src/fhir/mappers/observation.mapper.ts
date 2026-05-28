import { Sintoma } from '../../models/sintoma.entity.js';
import type { FhirObservationDto } from '../../dtos/fhir/observation/observationDTO.js';

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
