import { Sintoma } from '../../models/sintoma.entity.js';
import type { FhirObservationDto } from '../../dtos/fhir/observation/observationDTO.js';

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
